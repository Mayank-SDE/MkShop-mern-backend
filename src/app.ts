import express from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
// importing Routes
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';

//importing for database connection
import mongoDBConnect from './utils/database.js';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

//importing middlewares
import { errorMiddleware } from './middlewares/error.js';
dotenv.config();
const MONGO_URI = process.env.MONGO_DB_URI + '';

const MONGO_DB_NAME = process.env.MONGO_DB_NAME || '';

const STRIPE_KEY = process.env.STRIPE_KEY || '';

export const stripe = new Stripe(STRIPE_KEY);
export const nodeCache = new NodeCache();

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['mayank'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN as string,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })
);

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

//routes for creating coupon and payment integration
app.use('/api/v1/payment', paymentRoute);

//routes for getting the dashboard statistics
app.use('/api/v1/dashboard', statisticsRoute);

app.use(errorMiddleware);

mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on PORT http://localhost:${PORT}`);
});
