import MongoStore from 'connect-mongo';
import session from 'express-session';
import * as database from '../database';

export default session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: 'auto',
    httpOnly: true,
    maxAge: 86400000, // 24 hours
  },
  store: MongoStore.create({
    mongoUrl: database.getConnectionString(),
  }),
});
