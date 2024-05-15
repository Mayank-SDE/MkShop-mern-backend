import mongoose from 'mongoose';

const mongoDBConnect = (MONGO_URI: string, MONGO_DB_NAME: string) => {
  mongoose
    .connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
    })
    .then((database) => {
      console.log(`Database connected to the ${database.connection.host}`);
    })
    .catch((error) => {
      console.log('Database is not connected', error);
    });
};

export default mongoDBConnect;
