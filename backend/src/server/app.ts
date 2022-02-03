import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as logger from '../logger';
import userAuthMiddleware from './middleware/userAuth';
import passport from './passport';
import apiRoutes from './routes/api';
import publicRoutes from './routes/public';
import sessionStore from './sessionStore';

const app = express();

app.use(helmet());
const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(format, { stream: logger.stream }));
app.use(express.json());

app.use(sessionStore);
app.use(passport.initialize());
app.use(passport.session());

app.use(publicRoutes);
app.use('/api', userAuthMiddleware, apiRoutes);

export default app;
