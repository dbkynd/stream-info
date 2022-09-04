import express from 'express';
import seAuth from '../../middleware/seAuth';
import * as MultiService from '../../services/multi/multi_service';
import StatsService from '../../services/stats/stats_service';
import authRoutes from './auth';
import chatBotRoutes from './chat_bot';
import liveSubsRoutes from './live_subs';
import twitchEventSubRoutes from './twitch_eventsub';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chat', seAuth, chatBotRoutes);
router.use('/twitch/eventsub', twitchEventSubRoutes);
router.use(liveSubsRoutes);

router.get('/stats', (req, res, next) => {
  try {
    const response = StatsService();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.post('/setToken', (req, res, next) => {
  const { code } = req.body;
  // console.log(code);
  res.sendStatus(204);
});

router.get('/multi', async (req, res, next) => {
  try {
    const command = await MultiService.getMultiCommand();
    if (!command) {
      res.sendStatus(404);
      return;
    }
    const response = MultiService.transformReply(command.reply);
    if (!response) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

export default router;
