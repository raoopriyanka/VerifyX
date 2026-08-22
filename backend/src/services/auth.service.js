import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/env.js';

// Step 14: Generate JWT containing only non-sensitive identifiers
export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const registerUser = async (userData) => {
  const { name, email, password, organization, role } = userData;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('A user with this email already exists.');
  }

  // 2. Prevent arbitrary ADMIN registration
  if (role === 'ADMIN') {
    throw new Error('Admin registration is strictly prohibited via public endpoints.');
  }

  // 3. Create the user (Password hashing is handled automatically by User.js)
  const user = await User.create({
    name,
    email,
    password,
    organization,
    role,
  });

  return user;
};

export const loginUser = async (email, password) => {
  // 1. Find user by email and explicitly select the hidden password field for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // 2. Check if account is active
  if (!user.isActive) {
    throw new Error('This account has been deactivated.');
  }

  // 3. Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found.');
  return user;
};