import * as productService from '../services/product.service.js';

export const registerProduct = async (req, res, next) => {
  try {
    // req.user is attached by the authenticate middleware
    // We also attach organization from the DB lookup in a real flow, but for now we rely on the JWT payload / user ID
    const product = await productService.createProduct(req.body, { 
      userId: req.user.userId, 
      role: req.user.role 
    });
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A product with this ID already exists.' });
    }
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.user);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};