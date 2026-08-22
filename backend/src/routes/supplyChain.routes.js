import express from 'express';
import * as supplyChainController from '../controllers/supplyChain.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authenticate);

// Record a new supply chain state transition
router.post('/:productId/events', authorizeRoles('MANUFACTURER', 'DISTRIBUTOR', 'RETAILER'), supplyChainController.createEvent);

// Retrieve full chronological timeline for a product
router.get('/:productId', supplyChainController.getTimeline);

export default router;