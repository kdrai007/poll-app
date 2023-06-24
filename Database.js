import mongoose from 'mongoose';

const database = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('connection with database established');
};

export default database;
