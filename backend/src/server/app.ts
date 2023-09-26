import path from 'path';
import express from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';
import { emotesDir } from '../directories';
import * as logger from '../logger';
import passport from './passport';
import Api from './routes';
import sessionStore from './sessionStore';

const app = express();

/*app.use(
  helmet({
    contentSecurityPolicy: false, // TODO: figure out specifics for VUE
  }),
);*/
const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(format, { stream: logger.stream }));
app.use(express.json());

// @ts-ignore
app.use(sessionStore);
// @ts-ignore
app.use(passport.initialize());
// @ts-ignore
app.use(passport.session());

app.use('/api', Api);

app.use('/emotes', express.static(emotesDir));

if (process.env.NODE_ENV === 'production') {
  const wwwDir = path.join(__dirname, '../../../frontend/dist');

  app.get('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect('/api/auth/login');
      return;
    }
    res.sendFile(path.join(wwwDir, 'index.html'));
  });

  app.use(express.static(wwwDir));

  app.all('*', (req, res, next) => {
    res.sendFile(path.join(wwwDir, 'index.html'));
  });
}

export default app;
