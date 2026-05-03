import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.json());

app.use(cors());
app.use('/api', productRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error'
  });
});

export default app;
