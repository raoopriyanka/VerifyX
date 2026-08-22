import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      trim: true
    },
    // select: false ensures the password hash is never accidentally returned in API responses
    password: { type: String, required: true, select: false },
    organization: { type: String, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'MANUFACTURER', 'DISTRIBUTOR', 'RETAILER'],
      required: true,
    },
    walletAddress: { type: String, default: null }, // Reserved for Phase 3
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Step 11: Password Hashing Pre-Save Hook (Updated for Mongoose 8)
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return;
  
  // No need for try/catch or next(), Mongoose handles the promise rejection natively
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);