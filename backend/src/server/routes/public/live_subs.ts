import { Router } from 'express';
import { getLiveSubs } from '../../../twitch/twitch_polling/live_subs';

const router = Router();

router.get('/live', (req, res, next) => {
  try {
    const response = getLiveSubs();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.get('/live/count', (req, res, next) => {
  try {
    const response = getLiveSubs();
    res.status(200).send(response.length.toString());
  } catch (e) {
    next(e);
  }
});

export default router;
