import Product from '../models/Product.js';
import SupplyChainEvent from '../models/SupplyChainEvent.js';
import { generateProductId } from '../utils/generateId.js';
import { generateProductHash } from '../utils/hash.js';
import { registerProductOnBlockchain } from './blockchain.service.js';

export const createProduct = async (productData, user) => {
  // 1. Generate unique identifiers & cryptographic data hash
  const productId = generateProductId();
  const verificationHash = generateProductHash(productData);

  // 2. Create the Product record in MongoDB (defaulting blockchainRegistered to false)
  const product = await Product.create({
    ...productData,
    productId,
    verificationHash,
    status: 'MANUFACTURED',
    manufacturer: user.userId,
    registeredBy: user.userId,
    currentHolder: user.organization || user.role,
    blockchainRegistered: false,
  });

  // 3. Attempt to anchor the product registration on the blockchain
  const blockchainResult = await registerProductOnBlockchain(productId, verificationHash);

  if (blockchainResult.success) {
    product.blockchainRegistered = true;
    product.blockchainTransactionHash = blockchainResult.transactionHash;
    product.blockchainRegisteredAt = new Date();
    await product.save();
  } else {
    console.warn(`⚠️ Blockchain registration pending/failed for product ${productId}:`, blockchainResult.error);
  }

  // 4. Create the genesis Supply Chain Event in MongoDB
  await SupplyChainEvent.create({
    productId,
    eventType: 'REGISTERED',
    fromRole: user.role,
    fromUser: user.userId,
    notes: 'Digital identity minted and registered by Origin Node.',
  });

  return {
    product,
    blockchain: blockchainResult
  };
};

export const getProducts = async (user) => {
  const filter = user.role === 'MANUFACTURER' ? { manufacturer: user.userId } : {};
  return await Product.find(filter).sort({ createdAt: -1 }).populate('manufacturer', 'name organization');
};

export const getProductById = async (productId) => {
  const product = await Product.findOne({ productId }).populate('manufacturer', 'name organization');
  if (!product) throw new Error('Product not found.');
  return product;
};