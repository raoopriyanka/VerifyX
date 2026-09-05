import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// 1. PUBLIC ROUTE: Must be placed BEFORE authenticate and BEFORE /:productId 
// so consumers can access it without a token and Express doesn't mistake 'verify' for a productId.
router.get('/verify/:productId', productController.verifyProductNode);

// 2. Apply authentication middleware to all subsequent routes
router.use(authenticate);

// Manufacturer endpoints
router.post('/', authorizeRoles('MANUFACTURER'), productController.registerProduct);
router.get('/manufacturer', authorizeRoles('MANUFACTURER'), productController.getManufacturerProducts);

// General protected product endpoints
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductDetails);

// Custody transfer endpoint (accessible by distributors, manufacturers, and retailers)
router.patch('/:productId/transfer', authorizeRoles('DISTRIBUTOR', 'MANUFACTURER', 'RETAILER'), productController.transferCustody);

export default router;