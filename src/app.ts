import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';
import authRoute from './routes/authRoute.js';
import mongoDBConnect from './utils/database.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import './utils/passport.js';
import { errorMiddleware } from './middlewares/error.js';
import MongoStore from 'connect-mongo';

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string;
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const CORS_ORIGIN = process.env.CORS_ORIGN as string;

const corsOptions = {
  origin: CORS_ORIGIN,
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const stripe = new Stripe(STRIPE_KEY);
export const nodeCache = new NodeCache();

const app = express();
app.set('trust proxy', 1);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
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
);

mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working with /api/v1',
  });
});

app.use('/auth', authRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/dashboard', statisticsRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on PORT http://localhost:${PORT}`);
});

/*
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import Stripe from 'stripe';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';
import authRoute from './routes/authRoute.js';
import mongoDBConnect from './utils/database.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import './utils/passport.js';
import { errorMiddleware } from './middlewares/error.js';
import MongoStore from 'connect-mongo';

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string;
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const CORS_ORIGIN = process.env.CORS_ORIGN as string;

const corsOptions = {
  allowedOrigins: CORS_ORIGIN,
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
};

export const stripe = new Stripe(STRIPE_KEY);
export const nodeCache = new NodeCache();

const app = express();
app.set('trust proxy', 1);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
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
);

mongoDBConnect(MONGO_URI, MONGO_DB_NAME);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working with /api/v1',
  });
});

app.use('/auth', authRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/dashboard', statisticsRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on PORT http://localhost:${PORT}`);
});
*/
