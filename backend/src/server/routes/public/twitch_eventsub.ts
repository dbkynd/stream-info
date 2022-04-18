import { Router } from 'express';
import eventSub from '../../../twitch/twitch_eventsub';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    if (!eventSub.verify(req)) {
      res.sendStatus(403);
      return;
    }
    const challengeResponse = eventSub.challengeHandler(req);
    if (challengeResponse) {
      res.status(200).send(challengeResponse);
      return;
    }
    res.sendStatus(204);
    await eventSub.eventHandler(req);
  } catch (e) {
    next(e);
  }
});

export default router;
