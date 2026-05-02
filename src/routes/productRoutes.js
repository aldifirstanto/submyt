import { Router } from 'express';
import { addProduct, fetchProductByBarcode } from '../controllers/productController.js';

const router = Router();

router.get('/products/:barcode', fetchProductByBarcode);
router.post('/products', addProduct);

export default router;
