import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/env.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Ensure the user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'User account is deactivated.' });
    }

    // Attach user payload to the request object
    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};