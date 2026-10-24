import mongoose from 'mongoose';
import { seedDatabase } from './seedDB';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || process.env.MONGO_DB_URL || 'mongodb+srv://pratikkharadhara_db_user:Zrj9Q20ePLdFg0oq@cluster0.m6n0xhv.mongodb.net/travel_oasis?retryWrites=true&w=majority';
  try {
    console.log('[MongoDB Connecting] Connecting to MongoDB Atlas cluster...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`[MongoDB Connected] Successfully connected to host: ${conn.connection.host}`);
    console.log(`[MongoDB Database] Active DB: ${conn.connection.name}`);
    
    // Automatically seed and sync MongoDB collections
    await seedDatabase();
    return true;
  } catch (error: any) {
    console.warn(`[MongoDB Warning] Could not reach cluster: ${error.message}. Running with resilient internal store.`);
    return false;
  }
};
