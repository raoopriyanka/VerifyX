import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Route (Requires JWT)
router.get('/me', authenticate, authController.getMe);

export default router;