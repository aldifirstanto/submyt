import { Router } from 'express';
import { fetchProductByBarcode } from '../controllers/productController.js';

const router = Router();

router.get('/products/:barcode', fetchProductByBarcode);

export default router;
