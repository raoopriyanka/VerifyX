import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// Apply authentication to all product routes
router.use(authenticate);

// Only MANUFACTURERS can mint new products
router.post('/', authorizeRoles('MANUFACTURER'), productController.registerProduct);

// Any authenticated node can view products (filtered by the service)
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductDetails);

export default router;