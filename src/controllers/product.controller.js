import { createProduct, getProductByBarcode } from '../services/product.service.js';

export async function fetchProductByBarcode(req, res, next) {
  try {
    const { barcode } = req.params;
    const product = await getProductByBarcode(barcode);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function addProduct(req, res, next) {
  try {
    const { barcode, name, brand } = req.body;

    if (!barcode) {
      return res.status(400).json({
        message: 'barcode is required'
      });
    }

    const product = await createProduct({ barcode, name, brand });
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}
