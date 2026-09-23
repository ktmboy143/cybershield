import mongoose from 'mongoose';
import env from './env.js';

export async function connectDB() {
  if (!env.mongoUri) {
    console.warn('MONGODB_URI is not configured. Falling back to demo data mode.');
    return false;
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected successfully.');
    return true;
  } catch {
    console.error('MongoDB connection failed. Check MONGODB_URI and Atlas network access.');
    return false;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
