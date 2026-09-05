import mongoose from 'mongoose';
import Product from '../models/Product.js';
import SupplyChainEvent from '../models/SupplyChainEvent.js';
import { generateProductId } from '../utils/generateId.js';
import { generateProductHash } from '../utils/hash.js';
import { registerProductOnBlockchain } from './blockchain.service.js';

export const createProduct = async (productData, user) => {
  const productId = generateProductId();
  const verificationHash = generateProductHash(productData);

  const product = await Product.create({
    ...productData,
    productId,
    verificationHash,
    status: 'MANUFACTURED',
    manufacturer: user.id || user.userId,
    registeredBy: user.id || user.userId,
    currentHolder: user.organization || user.role,
    blockchainRegistered: false,
  });

  const blockchainResult = await registerProductOnBlockchain(productId, verificationHash);

  if (blockchainResult.success) {
    product.blockchainRegistered = true;
    product.blockchainTransactionHash = blockchainResult.transactionHash;
    product.blockchainRegisteredAt = new Date();
    await product.save();
  } else {
    console.warn(`⚠️ Blockchain registration pending/failed for product ${productId}:`, blockchainResult.error);
  }

  await SupplyChainEvent.create({
    productId,
    eventType: 'REGISTERED',
    fromRole: user.role,
    fromUser: user.id || user.userId,
    notes: 'Digital identity minted and registered by Origin Node.',
  });

  return product;
};

export const getProducts = async (user) => {
  let filter = {};
  
  if (user.role === 'MANUFACTURER') {
    const mId = user.id || user.userId || user._id;
    filter = { manufacturer: mId };
  } else if (user.role === 'DISTRIBUTOR') {
    const rawId = user.id || user.userId || user._id;
    if (!rawId) return [];

    let userObjectId;
    try {
      userObjectId = mongoose.Types.ObjectId.isValid(rawId) ? new mongoose.Types.ObjectId(rawId) : rawId;
    } catch {
      userObjectId = rawId;
    }

    filter = {
      $or: [
        { status: 'MANUFACTURED', currentHolderId: { $exists: false } },
        { status: 'MANUFACTURED', currentHolderId: null },
        { currentHolderId: userObjectId },
        { currentHolderId: rawId },
        { distributor: userObjectId },
        { distributor: rawId }
      ]
    };
  } else if (user.role === 'RETAILER') {
    const rawId = user.id || user.userId || user._id;
    let userObjectId;
    try {
      userObjectId = mongoose.Types.ObjectId.isValid(rawId) ? new mongoose.Types.ObjectId(rawId) : rawId;
    } catch {
      userObjectId = rawId;
    }

    filter = {
      $or: [
        { status: 'IN_TRANSIT' },
        { status: 'DELIVERED' },
        { currentHolderId: userObjectId },
        { currentHolderId: rawId }
      ]
    };
  }

  return await Product.find(filter).sort({ createdAt: -1 }).populate('manufacturer', 'name organization');
};

export const getProductById = async (productId) => {
  const product = await Product.findOne({ productId }).populate('manufacturer', 'name organization');
  if (!product) throw new Error('Product not found.');
  
  // Fetch chronological audit trail events
  const events = await SupplyChainEvent.find({ productId }).sort({ createdAt: 1 });
  
  return {
    ...product.toObject(),
    events
  };
};

export const updateProductStatus = async (productId, updateData, user) => {
  const product = await Product.findOne({ productId });
  if (!product) throw new Error('Product not found.');

  product.status = updateData.status || product.status;
  product.currentHolder = user.organization || user.role;
  product.currentHolderId = user.id || user.userId;
  await product.save();

  await SupplyChainEvent.create({
    productId: product.productId,
    eventType: updateData.status, // Logs 'DELIVERED'
    fromRole: user.role,
    fromUser: user.id || user.userId,
    notes: updateData.notes || 'Shipment verified and received into retail inventory.'
  });

  return product;
};