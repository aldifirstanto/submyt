import { getProductByBarcode } from '../services/productService.js';

export async function fetchProductByBarcode(req, res, next) {
  try {
    const { barcode } = req.params;
    const product = await getProductByBarcode(barcode);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
