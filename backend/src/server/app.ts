import path from 'path';
import history from 'connect-history-api-fallback';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as logger from '../logger';
import passport from './passport';
import Api from './routes';
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

app.use('/api', Api);

if (process.env.NODE_ENV === 'production') {
  app.use(history());
  const wwwDir = path.join(__dirname, '../../../frontend/dist');
  app.use(express.static(wwwDir));
  app.get('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect('/api/auth/login');
      return;
    }
    res.sendFile(path.join(wwwDir, 'index.html'));
  });
}

export default app;
