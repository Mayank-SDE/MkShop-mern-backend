import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoDBConnect = mongoose
    .connect(process.env.MONGO_DB_URL, {
    dbName: 'MKShop',
})
    .then((database) => {
    console.log(`Database connected to the ${database.connection.host}`);
})
    .catch(() => {
    console.log('Database is not connected');
});
export default mongoDBConnect;
