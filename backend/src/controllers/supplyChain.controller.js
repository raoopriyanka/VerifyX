import * as supplyChainService from '../services/supplyChain.service.js';

export const createEvent = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await supplyChainService.recordSupplyChainEvent(productId, req.body, {
      userId: req.user.userId,
      role: req.user.role,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes('Invalid state transition')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

export const getTimeline = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const timeline = await supplyChainService.getProductTimeline(productId);

    res.status(200).json({
      success: true,
      data: timeline,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};