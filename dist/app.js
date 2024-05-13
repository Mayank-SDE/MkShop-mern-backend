import express from 'express';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
// importing Routes
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
//importing for database connection
import mongoDBConnect from './utils/database.js';
//importing middlewares
import { errorMiddleware } from './middlewares/error.js';
export const nodeCache = new NodeCache();
const app = express();
dotenv.config();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/assets', express.static('assets'));
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
app.use(errorMiddleware);
mongoDBConnect;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express is running on PORT http://localhost:${PORT}`);
});
