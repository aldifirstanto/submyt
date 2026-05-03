import { createPurchase } from '../services/purchase.service.js';

export async function addPurchase(req, res, next) {
  try {
    const { productId, price, storeName } = req.body;
    const purchase = await createPurchase({ productId, price, storeName });
    return res.status(201).json(purchase);
  } catch (error) {
    return next(error);
  }
}
