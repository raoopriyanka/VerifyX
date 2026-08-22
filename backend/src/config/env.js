import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

// Validate required variables
const requiredConfig = ['MONGODB_URI', 'JWT_SECRET'];
for (const envVar of requiredConfig) {
  if (!config[envVar]) {
    console.error(`[FATAL] Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export default config;