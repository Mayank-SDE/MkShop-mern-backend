import express from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
// importing Routes
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';

//importing for database connection
import mongoDBConnect from './utils/database.js';

import morgan from 'morgan';

//importing middlewares
import { errorMiddleware } from './middlewares/error.js';

export const nodeCache = new NodeCache();

const app = express();
dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));

app.get('/', (request, response) => {
  return response.status(200).json({
    success: true,
    message: 'API is working with /api/v1',
  });
});

// routes for user
app.use('/api/v1/user', userRoute);

// routes for products
app.use('/api/v1/product', productRoute);

//routes for new order
app.use('/api/v1/order', orderRoute);

app.use(errorMiddleware);

const MONGO_URI = process.env.MONGO_DB_URI + '';

const MONGO_DB_NAME = process.env.MONGO_DB_NAME || '';
mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on PORT http://localhost:${PORT}`);
});
