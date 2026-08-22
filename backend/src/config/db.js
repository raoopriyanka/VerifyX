import mongoose from 'mongoose';
import config from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`[MongoDB] Connected safely to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    // The server should not silently run without MongoDB
    process.exit(1); 
  }
};