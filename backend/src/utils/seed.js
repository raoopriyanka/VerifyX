import mongoose from 'mongoose';
import User from '../models/User.js';
import config from '../config/env.js';

const seedUsers = [
  {
    name: 'System Administrator',
    email: 'admin@verifyx.com',
    password: 'AdminPassword123!',
    organization: 'VerifyX Core',
    role: 'ADMIN',
  },
  {
    name: 'Priyanka Rao (Manufacturer)',
    email: 'manufacturer@verifyx.com',
    password: 'ManufacturerPassword123!',
    organization: 'VerifyX Origin Mfg',
    role: 'MANUFACTURER',
  },
  {
    name: 'Mumbai Logistics Distributor',
    email: 'distributor@verifyx.com',
    password: 'DistributorPassword123!',
    organization: 'Central Logistics Hub',
    role: 'DISTRIBUTOR',
  },
  {
    name: 'Andheri Retail Partner',
    email: 'retailer@verifyx.com',
    password: 'RetailerPassword123!',
    organization: 'Metro Retail Store',
    role: 'RETAILER',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('[Seed] Connected to MongoDB for seeding...');

    for (const userData of seedUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        // Creating the user triggers the pre-save password hashing hook automatically
        await User.create(userData);
        console.log(`[Seed] Created user: ${userData.role} (${userData.email})`);
      } else {
        console.log(`[Seed] User already exists: ${userData.email}`);
      }
    }

    console.log('[Seed] Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();