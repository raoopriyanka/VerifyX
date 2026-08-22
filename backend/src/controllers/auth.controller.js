import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    const token = authService.generateToken(user._id, user.role);
    
    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token
      }
    });
  } catch (error) {
    // If it's a known error from our service, return 400 Bad Request
    if (error.message.includes('already exists') || error.message.includes('strictly prohibited')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await authService.loginUser(email, password);
    const token = authService.generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token
      }
    });
  } catch (error) {
    if (error.message.includes('Invalid') || error.message.includes('deactivated')) {
      return res.status(401).json({ success: false, message: error.message });
    }
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role, organization: user.organization }
    });
  } catch (error) {
    next(error);
  }
};