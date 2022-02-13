import path from 'path';
import history from 'connect-history-api-fallback';
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

app.use(
  helmet({
    contentSecurityPolicy: false, // TODO: figure out specifics for VUE
  }),
);
const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(format, { stream: logger.stream }));
app.use(express.json());

app.use(sessionStore);
app.use(passport.initialize());
app.use(passport.session());

app.use(history());

if (process.env.NODE_ENV === 'production') {
  const wwwDir = path.join(__dirname, '../../../frontend/dist');
  app.use(express.static(wwwDir));
  app.get('/', (req, res, next) => {
    res.sendFile(path.join(wwwDir, 'index.html'));
  });
}

app.use(publicRoutes);
app.use('/api', userAuthMiddleware, apiRoutes);

export default app;
