import { Router } from 'express';
import twitchApi from '../../../twitch/twitch_api';
import sdAuth from '../../middleware/sdAuth';

const router = Router();

router.use(sdAuth);

const allowedLengths = [30, 60, 90, 120, 150, 180];

router.post('/ads', async (req, res, next) => {
  const { length } = req.body;
  if (!length || !allowedLengths.includes(length)) {
    res.sendStatus(400);
    return;
  }
  try {
    await twitchApi.startCommercial(length);
  } catch (e) {
    next(e);
  }
});

export default router;
