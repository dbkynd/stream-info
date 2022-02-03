import path from 'path';
import express from 'express';
import morgan from 'morgan';
import * as logger from '../logger';
import userAuthMiddleware from './middleware/userAuth';
import passport from './passport';
import apiRoutes from './routes/api';
import publicRoutes from './routes/public';
import sessionStore from './sessionStore';

const app = express();

const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(format, { stream: logger.stream }));
app.use(express.json());

app.use(sessionStore);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  const wwwDir = path.join(process.cwd(), '../frontend/dist');
  app.use(express.static(wwwDir));
  app.get('/', (req, res, next) => {
    res.sendFile(path.join(wwwDir, 'index.html'));
  });
}

app.use(publicRoutes);
app.use('/api', userAuthMiddleware, apiRoutes);

export default app;
