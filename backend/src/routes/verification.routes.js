import express from 'express';
import * as verificationController from '../controllers/verification.controller.js';

const router = express.Router();

// Public endpoint: NO authenticate middleware required!
router.get('/:productId', verificationController.verifyProduct);

export default router;