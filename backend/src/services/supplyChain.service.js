import Product from '../models/Product.js';
import SupplyChainEvent from '../models/SupplyChainEvent.js';
import { ethers } from 'ethers';
import { recordSupplyChainEventOnBlockchain } from './blockchain.service.js';

// Map string states to Solidity contract enum indices
const statusMapping = {
  MANUFACTURED: 0,
  DISPATCHED: 1,
  IN_TRANSIT: 2,
  RECEIVED: 3,
  SOLD: 4,
  FLAGGED: 5
};

// Controlled State Machine Rules
const VALID_TRANSITIONS = {
  MANUFACTURED: ['DISPATCHED', 'FLAGGED'],
  DISPATCHED: ['IN_TRANSIT', 'FLAGGED'],
  IN_TRANSIT: ['RECEIVED', 'FLAGGED'],
  RECEIVED: ['SOLD', 'FLAGGED'],
  SOLD: ['FLAGGED'],
  FLAGGED: [] // Terminal state requiring intervention
};

export const validateTransition = (currentState, nextEventType) => {
  const allowedNext = VALID_TRANSITIONS[currentState] || [];
  return allowedNext.includes(nextEventType);
};

export const recordSupplyChainEvent = async (productId, eventData, user) => {
  const { eventType, location, notes, toRole } = eventData;
  const timestamp = Date.now();

  // 1. Verify product exists
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error('Product not found.');
  }

  // 2. Validate state transition
  const isValid = validateTransition(product.status, eventType);
  if (!isValid && eventType !== 'FLAGGED') {
    throw new Error(`Invalid state transition from ${product.status} to ${eventType}.`);
  }

  // 3. Generate deterministic event hash for cryptographic integrity
  const rawData = `${productId}-${eventType}-${user.userId}-${timestamp}-${user.role}-${toRole || 'NA'}`;
  const eventHash = ethers.keccak256(ethers.toUtf8Bytes(rawData));

  // 4. Create the event record in MongoDB
  const event = await SupplyChainEvent.create({
    productId,
    eventType,
    fromRole: user.role,
    fromUser: user.userId,
    toRole: toRole || null,
    location: location || 'Supply Chain Hub',
    notes: notes || `Product status updated to ${eventType} by ${user.role}`,
    eventHash,
    blockchainRecorded: false
  });

  // 5. Update product status and current holder in MongoDB
  product.status = eventType;
  if (toRole) {
    product.currentHolder = toRole;
  } else if (eventType === 'SOLD') {
    product.currentHolder = 'Consumer / End User';
  }
  await product.save();

  // 6. Anchor the event on the blockchain
  const statusIndex = statusMapping[eventType] !== undefined ? statusMapping[eventType] : 1;
  const blockchainResult = await recordSupplyChainEventOnBlockchain(
    productId,
    eventType,
    eventHash,
    statusIndex
  );

  if (blockchainResult.success) {
    event.blockchainRecorded = true;
    event.blockchainTransactionHash = blockchainResult.transactionHash;
    await event.save();
  } else {
    console.warn(`⚠️ Blockchain event recording pending/failed for product ${productId}:`, blockchainResult.error);
  }

  return { 
    product, 
    event, 
    blockchain: blockchainResult 
  };
};

export const getProductTimeline = async (productId) => {
  const product = await Product.findOne({ productId });
  if (!product) throw new Error('Product not found.');

  const events = await SupplyChainEvent.find({ productId })
    .sort({ timestamp: 1 })
    .populate('fromUser', 'name organization role');

  return { product, events };
};