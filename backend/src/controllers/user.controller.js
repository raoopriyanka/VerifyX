import User from '../models/User.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Prevent admin from deactivating themselves
    if (id === req.user.userId.toString() && isActive === false) {
      return res.status(400).json({ success: false, message: 'Administrators cannot deactivate their own accounts.' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status updated successfully.`,
      data: { id: user._id, email: user.email, isActive: user.isActive }
    });
  } catch (error) {
    next(error);
  }
};