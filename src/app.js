import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', productRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error'
  });
});

export default app;
