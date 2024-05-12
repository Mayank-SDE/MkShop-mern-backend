import express from 'express';
import dotenv from 'dotenv';
// importing Routes
import userRoute from './routes/userRoute.js';
import mongoDBConnect from './utils/database.js';
import { errorMiddleware } from './middlewares/error.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (request, response) => {
    return response.status(200).json({
        success: true,
        message: 'API is working with /api/v1',
    });
});
// using Routes
app.use('/api/v1/user', userRoute);
app.use(errorMiddleware);
mongoDBConnect;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express is running on PORT http://localhost:${PORT}`);
});
