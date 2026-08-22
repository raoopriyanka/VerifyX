import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: { 
      type: String, 
      required: true, 
      unique: true,
      index: true // Indexed for fast QR code lookups
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    batchNumber: { type: String, required: true },
    manufacturingDate: { type: Date, required: true },
    price: { type: Number },
    imageUrl: { type: String },
    
    // Status tracking
    status: {
      type: String,
      enum: ['MANUFACTURED', 'DISPATCHED', 'IN_TRANSIT', 'RECEIVED', 'SOLD', 'FLAGGED'],
      default: 'MANUFACTURED',
    },
    
    // Custody & Ownership
    manufacturer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    registeredBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    currentHolder: { 
      type: String, // Storing organization name/role for now
      required: true 
    },
    
    // Security & Provenance
    verificationHash: { type: String, required: true },
    
    // Phase 3 Placeholder
    blockchainRecordId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);