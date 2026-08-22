import Product from '../models/Product.js';
import SupplyChainEvent from '../models/SupplyChainEvent.js';
import { getBlockchainProduct } from './blockchain.service.js';

export const verifyProductPublicly = async (productId) => {
  // 1. Find the product in MongoDB
  const product = await Product.findOne({ productId }).populate('manufacturer', 'name organization');
  
  if (!product) {
    return {
      found: false,
      verificationStatus: 'NOT_FOUND',
      message: 'Product record not found in VerifyX database.'
    };
  }

  // 2. Fetch the full chronological supply-chain timeline
  const timeline = await SupplyChainEvent.find({ productId })
    .sort({ timestamp: 1 })
    .populate('fromUser', 'name organization role');

  // 3. Fetch immutable record from the blockchain
  const blockchainResult = await getBlockchainProduct(productId);

  // 4. Handle Flagged Products
  if (product.status === 'FLAGGED' || blockchainResult.status === 5) {
    return {
      found: true,
      verificationStatus: 'FLAGGED',
      message: 'Product has been flagged for security or authenticity concerns.',
      product: formatProductResponse(product),
      blockchainVerified: blockchainResult.success,
      timeline
    };
  }

  // 5. Handle Missing Blockchain Record
  if (!blockchainResult.success || !blockchainResult.exists) {
    return {
      found: true,
      verificationStatus: 'BLOCKCHAIN_PENDING',
      message: 'Product exists in database, but blockchain verification record is missing or pending.',
      product: formatProductResponse(product),
      blockchainVerified: false,
      timeline
    };
  }

  // 6. Compare Hashes (MongoDB verificationHash vs Blockchain dataHash)
  const isHashMatching = product.verificationHash === blockchainResult.dataHash;

  if (!isHashMatching) {
    return {
      found: true,
      verificationStatus: 'POTENTIAL_COUNTERFEIT',
      message: 'SECURITY ALERT: The product record data hash does not match the immutable blockchain ledger hash!',
      product: formatProductResponse(product),
      blockchain: {
        registeredAt: blockchainResult.registeredAt,
        manufacturer: blockchainResult.manufacturer,
        contractAddress: blockchainResult.contractAddress
      },
      blockchainVerified: false,
      timeline
    };
  }

  // 7. Fully Verified Authentic Product
  return {
    found: true,
    verificationStatus: 'AUTHENTIC',
    blockchainStatus: 'VERIFIED ON-CHAIN',
    message: 'Product is fully verified and authentic on the blockchain ledger.',
    product: formatProductResponse(product),
    blockchain: {
      transactionHash: product.blockchainTransactionHash || 'N/A',
      contractAddress: blockchainResult.contractAddress,
      registeredAt: blockchainResult.registeredAt,
      blockchainStatus: blockchainResult.status
    },
    blockchainVerified: true,
    timeline
  };
};

function formatProductResponse(product) {
  return {
    productId: product.productId,
    name: product.name,
    brand: product.brand,
    category: product.category,
    batchNumber: product.batchNumber,
    manufacturingDate: product.manufacturingDate,
    status: product.status,
    currentHolder: product.currentHolder,
    manufacturer: product.manufacturer,
    verificationHash: product.verificationHash,
    registeredAt: product.createdAt,
    blockchainRegistered: product.blockchainRegistered,
    blockchainTransactionHash: product.blockchainTransactionHash
  };
}