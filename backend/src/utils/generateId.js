import crypto from 'crypto';

/**
 * Generates a customer-facing VerifyX Product ID
 * Format: VX-YYYY-XXXXXX (e.g., VX-2026-A9F3B2)
 */
export const generateProductId = () => {
  const year = new Date().getFullYear();
  // Generate 6 random uppercase hex characters
  const randomStr = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `VX-${year}-${randomStr}`;
};