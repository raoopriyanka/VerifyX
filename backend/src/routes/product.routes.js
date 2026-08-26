import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Manufacturer endpoints
router.post('/', authorizeRoles('MANUFACTURER'), productController.registerProduct);
router.get('/manufacturer', authorizeRoles('MANUFACTURER'), productController.getManufacturerProducts);

// General product endpoints
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductDetails);

// Distributor custody transfer endpoint (accessible by distributors and manufacturers)
router.patch('/:productId/transfer', authorizeRoles('DISTRIBUTOR', 'MANUFACTURER'), productController.transferCustody);

export default router;