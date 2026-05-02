import { Router } from 'express';
import { addProduct, fetchProductByBarcode } from '../controllers/productController.js';
import { addPurchase } from '../controllers/purchaseController.js';

const router = Router();

router.get('/products/:barcode', fetchProductByBarcode);
router.post('/products', addProduct);
router.post('/purchases', addPurchase);

export default router;
