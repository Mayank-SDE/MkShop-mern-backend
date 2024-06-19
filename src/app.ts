import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
// Importing Routes
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';
import authRoute from './routes/authRoute.js';
// Importing for database connection
import mongoDBConnect from './utils/database.js';
import cors from 'cors';
import passport from 'passport';
// import session from 'express-session';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import './utils/passport.js';
// import MongoStore from 'connect-mongo';
// Importing middlewares
import { errorMiddleware } from './middlewares/error.js';
import mongoose from 'mongoose';
import { User, UserInterface } from './models/user.js';
import { Session } from './models/session.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string;
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const CLIENT_URL = process.env.CORS_ORIGIN as string;

export const stripe = new Stripe(STRIPE_KEY);
export const nodeCache = new NodeCache();

const app = express();

/*
// Session configuration
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: MONGO_DB_NAME,
      collectionName: 'sessions',
      autoRemove: 'interval',
      autoRemoveInterval: 10,
    }),
  })
);*/

// Database connection
mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

// Cookie session configuration
app.use(
  cookieSession({
    name: 'session',
    keys: [SESSION_SECRET],
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true, // Set to true in production
    httpOnly: true,
  })
);
/*
// Middleware to handle session storage
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    try {
      const session = await Session.findOne({ sessionId: req.session.userId });
      if (session) {
        req.user = (await User.findById(session.userId)) as UserInterface;
      }
    } catch (error) {
      console.error('Error finding session:', error);
    }
  }
  next();
});
*/
// Middleware to handle session storage
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    // Ensure req.session.userId is checked for existence
    try {
      const session = await Session.findOne({ sessionId: req.session.userId });
      if (session) {
        // Cast session.userId as mongoose.Types.ObjectId to satisfy TypeScript
        req.user = (await User.findById(session.userId)) as UserInterface;
      }
    } catch (error) {
      console.error('Error finding session:', error);
    }
  }
  next();
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});

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
