import express from 'express';
import CheerService from '../../../database/lib/cheer';
import HostService from '../../../database/lib/host';
import SubscriptionService from '../../../database/lib/subscription';
import TipService from '../../../database/lib/tip';
import * as state from '../../../events/state';
import * as twitchIrc from '../../../twitch/twitch_irc';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.get('/user', (req, res, next) => {
  res.status(200).json(req.user);
});

router.get('/state', (req, res, next) => {
  try {
    const payload = {
      appState: state.getAppState(),
      roomstate: state.getRoomstate(),
    };
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
});

router.get('/lists', async (req, res, next) => {
  try {
    const payload = {
      cheers: await CheerService.list(),
      hosts: await HostService.list(),
      subscriptions: await SubscriptionService.list(),
      tips: await TipService.list(),
    };
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
});

router.post('/say', (req, res, next) => {
  const { message } = req.body as { [key: string]: string | undefined };
  if (!message) {
    res.sendStatus(400);
    return;
  }
  try {
    twitchIrc.say(message);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
