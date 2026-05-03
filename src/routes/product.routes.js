
import express from "express";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:barcode", productController.getProductByBarcode);

export default router;