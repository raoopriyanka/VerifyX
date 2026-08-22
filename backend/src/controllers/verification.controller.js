import * as verificationService from '../services/verification.service.js';

export const verifyProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await verificationService.verifyProductPublicly(productId);

    if (!result.found) {
      return res.status(404).json({
        success: false,
        message: result.message
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};