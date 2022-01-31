import mongoose from 'mongoose';
import logger from '../logger';

const options: mongoose.ConnectOptions = {};

export async function connect(mongoUrl?: string): Promise<void> {
  const url = mongoUrl || process.env.MONGO_URL;
  if (!url) throw new Error('Missing MONGO_URL');
  const { hostname, pathname } = new URL(url);
  await mongoose.connect(url, options);
  logger.info(`Connected to MongoDB: '${hostname}${pathname}'`);
}

export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Database connection closed');
}
