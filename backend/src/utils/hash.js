import crypto from 'crypto';

/**
 * Generates a deterministic SHA-256 hash based on core product data.
 * This acts as a digital fingerprint for the physical product.
 */
export const generateProductHash = (productData) => {
  // 1. Extract only the immutable, core fields
  const { name, brand, batchNumber, manufacturingDate } = productData;

  // 2. Create a standardized string representation
  const rawString = `${name}|${brand}|${batchNumber}|${new Date(manufacturingDate).toISOString()}`;

  // 3. Generate the SHA-256 hash
  return crypto.createHash('sha256').update(rawString).digest('hex');
};