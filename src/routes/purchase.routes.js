import { Router } from 'express';
import { addPurchase } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/', addPurchase);

export default router;