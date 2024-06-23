import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import './utils/passport.js';
import mongoDBConnect from './utils/database.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import statisticsRoute from './routes/statisticsRoute.js';
import authRoute from './routes/authRoute.js';
import { errorMiddleware } from './middlewares/error.js';

dotenv.config();

const app = express();

const MONGO_URI = process.env.MONGO_DB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const CORS_ORIGIN = process.env.CORS_ORIGIN as string;

// CORS Options
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (CORS_ORIGIN.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));
app.use(morgan('dev'));

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
