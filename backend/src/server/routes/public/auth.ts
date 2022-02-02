import express from 'express';
import passport from '../../passport';

const router = express.Router();
const appUrl = process.env.APP_URL;

// BASE/auth/login
router.get('/login', passport.authenticate('twitch'));

// BASE/auth/callback
router.get(
  '/callback',
  passport.authenticate('twitch', {
    successRedirect: appUrl,
    failureRedirect: `${appUrl}/unauthorized`,
  }),
);

// BASE/auth/logout
router.get('/logout', (req, res, next) => {
  req.session.destroy(function () {
    res.sendStatus(204);
  });
});

export default router;
