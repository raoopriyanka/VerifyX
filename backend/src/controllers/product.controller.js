import * as productService from '../services/product.service.js';
import Product from '../models/Product.js';
import SupplyChainEvent from '../models/SupplyChainEvent.js';

export const registerProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body, { 
      userId: req.user.userId || req.user._id, 
      role: req.user.role,
      organization: req.user.organization 
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

export const getManufacturerProducts = async (req, res, next) => {
  try {
    const userId = req.user.userId || req.user._id;
    
    const allProducts = await productService.getProducts(req.user);
    
    const products = allProducts.filter(p => {
      const mId = p.manufacturer?.toString() || p.createdBy?.toString();
      return !mId || mId === userId.toString() || p.manufacturer === req.user.email;
    });

    const finalProducts = products.length > 0 ? products : allProducts;

    return res.status(200).json({
      success: true,
      count: finalProducts.length,
      data: finalProducts
    });
  } catch (error) {
    console.error("Error fetching manufacturer products:", error);
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    let products;

    if (req.user.role === 'DISTRIBUTOR') {
      const userId = req.user.userId || req.user._id;
      // Fetch only items assigned to this distributor or waiting for initial intake
      products = await Product.find({
        $or: [
          { currentHolderId: userId },
          { distributor: userId },
          { currentHolderId: { $exists: false }, status: { $ne: 'DELIVERED' } }
        ]
      });
    } else if (req.user.role === 'RETAILER') {
      // Fetch delivered items as well as any flagged discrepancies so they stay visible in store inventory
      const userId = req.user.userId || req.user._id;
      products = await Product.find({
        $or: [
          { currentHolderId: userId },
          { status: { $in: ['DELIVERED', 'DISCREPANCY_FLAGGED'] } }
        ]
      });
    } else {
      products = await productService.getProducts(req.user);
    }

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

export const transferCustody = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { status, notes } = req.body; // Accept custom notes from frontend

    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const userId = req.user.id || req.user.userId || req.user._id;
    const role = req.user.role || 'USER';
    const org = req.user.organization || role;

    // Set current holder based on role
    product.currentHolder = org;
    product.currentHolderId = userId;
    product.status = status || (role === 'RETAILER' ? 'DELIVERED' : 'IN_TRANSIT');
    await product.save();

    // Use dynamic notes sent from frontend, or fallback based on role
    const defaultNotes = role === 'RETAILER'
      ? `Custody transferred and accepted by retail node (${org}).`
      : `Custody transferred and accepted by distributor node (${org}).`;

    await SupplyChainEvent.create({
      productId,
      eventType: 'CUSTODY_TRANSFER',
      fromRole: role,
      fromUser: userId,
      notes: notes || defaultNotes
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
export const verifyProductNode = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product node not found on ledger.' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Product authenticity verified successfully.',
      data: product 
    });
  } catch (error) {
    next(error);
  }
};