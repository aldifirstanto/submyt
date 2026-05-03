import { Router } from 'express';
import { addProduct, fetchProductByBarcode } from '../controllers/product.controller.js';
import { addPurchase } from '../controllers/purchase.controller.js';

const router = Router();

router.get('/products/:barcode', fetchProductByBarcode);
router.post('/products', addProduct);
router.post('/purchases', addPurchase);

export default router;
