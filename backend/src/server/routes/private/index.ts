import express from 'express';
import CheerService from '../../../database/lib/cheer';
import RaidService from '../../../database/lib/raid';
import SubscriptionService from '../../../database/lib/subscription';
import TipService from '../../../database/lib/tip';
import UserService from '../../../database/lib/user';
import * as emotes from '../../../emotes';
import * as twitchIrc from '../../../twitch/twitch_irc';
import ClearService from '../../services/clear/clear_service';
import HoursService from '../../services/hours/hours_service';
import RaidModeRoutes from '../common/raidmode';
import SusTermRoutes from './sus_terms';

const router = express.Router();

router.use('/terms', SusTermRoutes);
router.post('/raidmode', RaidModeRoutes);

router.get('/user', (req, res, next) => {
  res.status(200).json(req.user);
});

router.get('/user/settings', async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.user as string);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(user.settings);
  } catch (e) {
    next(e);
  }
});

router.put('/user/settings', async (req, res, next) => {
  const { settings } = req.body;
  if (!settings) {
    res.sendStatus(400);
    return;
  }
  try {
    await UserService.updateSettings(req.user as string, settings);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.get('/lists', async (req, res, next) => {
  try {
    const payload = await emotes.parseBulkMessages({
      cheers: await CheerService.list(),
      raids: await RaidService.list(),
      subscriptions: await SubscriptionService.list(),
      tips: await TipService.list(),
    });
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
});

router.post('/say', async (req, res, next) => {
  const { message } = req.body as { [key: string]: string | undefined };
  if (!message) {
    res.sendStatus(400);
    return;
  }
  try {
    await twitchIrc.say(message);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.post('/clear', (req, res, next) => {
  const { name, id } = req.body as { [key: string]: string | undefined };
  if (!name || !id) {
    res.sendStatus(400);
    return;
  }
  try {
    ClearService.clearOne(name, id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.post('/clear/all', (req, res, next) => {
  try {
    ClearService.clearAll();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.get('/hours', async (req, res, next) => {
  try {
    const response = await HoursService();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.post('/restart', (req, res, next) => {
  if (req.user === '59351240') {
    res.sendStatus(204);
    process.exit(0);
  }
});

export default router;
