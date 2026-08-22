import mongoose from 'mongoose';

const supplyChainEventSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, index: true },
    eventType: {
      type: String,
      enum: ['REGISTERED', 'DISPATCHED', 'IN_TRANSIT', 'RECEIVED', 'SOLD', 'FLAGGED'],
      required: true,
    },
    fromRole: { type: String, required: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Optional depending on the event (e.g., dispatching TO someone)
    toRole: { type: String },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    location: { type: String },
    notes: { type: String },
    
    timestamp: { type: Date, default: Date.now },
    
    // Phase 3 Placeholders (Intentionally false/null for Phase 2)
    blockchainRecorded: { type: Boolean, default: false },
    transactionHash: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('SupplyChainEvent', supplyChainEventSchema);