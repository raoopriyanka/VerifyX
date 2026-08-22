import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// All user management routes require authentication and strictly ADMIN privileges
router.use(authenticate);
router.use(authorizeRoles('ADMIN'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);

export default router;