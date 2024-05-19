import express from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
// Importing Routes
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';
import authRoute from './routes/authRoute.js';
// Importing for database connection
import mongoDBConnect from './utils/database.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import './utils/passport.js';
import MongoStore from 'connect-mongo';
// Importing middlewares
import { errorMiddleware } from './middlewares/error.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string;
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const CLIENT_URL = process.env.CORS_ORIGIN as string;

export const stripe = new Stripe(STRIPE_KEY);
export const nodeCache = new NodeCache();

const app = express();

// Database connection
mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

// Session configuration
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: MONGO_DB_NAME,
      collectionName: 'sessions',
      autoRemove: 'interval',
      autoRemoveInterval: 1,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working with /api/v1',
  });
});

// Routes for client authentication using social login
app.use('/auth', authRoute);

// Routes for user management
app.use('/api/v1/user', userRoute);

// Routes for products
app.use('/api/v1/product', productRoute);

// Routes for new orders
app.use('/api/v1/order', orderRoute);

// Routes for creating coupon and payment integration
app.use('/api/v1/payment', paymentRoute);

// Routes for getting the dashboard statistics
app.use('/api/v1/dashboard', statisticsRoute);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on PORT http://localhost:${PORT}`);
});
