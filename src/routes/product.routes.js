import { Router } from 'express';
import { addProduct, fetchProductByBarcode } from '../controllers/product.controller.js';

const router = Router();

router.get('/:barcode', fetchProductByBarcode);
router.post('/', addProduct);

export default router;