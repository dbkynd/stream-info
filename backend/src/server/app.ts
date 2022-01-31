import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as logger from '../logger';
import publicRoutes from './routes/public';

const app = express();

app.use(helmet());
const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(format, { stream: logger.stream }));
app.use(express.json());

app.use(publicRoutes);

export default app;
