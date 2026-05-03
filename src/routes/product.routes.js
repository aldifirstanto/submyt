
import express from "express";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:barcode", productController.fetchProductByBarcode);


export default router;