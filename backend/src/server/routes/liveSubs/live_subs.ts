import { Router } from 'express';
import { getLiveSubs } from '../../../twitch/twitch_polling/live_subs';
import path from 'path';

const router = Router();

router.get('/live', (req, res, next) => {
  try {
    const response = getLiveSubs();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.get('/live.js', (req, res, next) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname, 'liveSubs.js'));
  } catch (e) {
    next(e);
  }
});

export default router;
