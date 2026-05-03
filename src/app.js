import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";

const app = express();

app.use(cors()); // 🔥 REQUIRED for your error
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);

export default app;