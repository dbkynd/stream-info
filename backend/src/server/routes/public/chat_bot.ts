import express from 'express';
import seAuth from '../../middleware/seAuth';
import ClipService from '../../services/clips/clips_service';
import GamesService from '../../services/games/games_service';
import SongService from '../../services/song/song_service';
import TimeService from '../../services/time/time_service';
import UptimeService from '../../services/uptime/uptime_service';
import WhatNowService from '../../services/whatnow/whatnow_service';
import RaidModeRoute from '../common/raidmode';

const router = express.Router();

router.use(seAuth);

// $(customapi.BASE_URL/chat/clips?token=token&action=$(1)&target=$(2))
router.get('/clips', async (req, res, next) => {
  const { action, target } = req.query as { [key: string]: string | undefined };
  if (!action || !target) {
    res.sendStatus(400);
    return;
  }
  try {
    const response = await ClipService(action, target);
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

// $(customapi.BASE_URL/chat/games)
router.get('/games', async (req, res, next) => {
  try {
    const response = await GamesService();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

// $(customapi.BASE_URL/chat/raidmode?token=token&action=$(1))
router.get('/raidmode', RaidModeRoute);

// $(customapi.BASE_URL/chat/song?user=dbkynd)
router.get('/song', async (req, res, next) => {
  const { user } = req.query as { [key: string]: string | undefined };
  if (!user) {
    res.sendStatus(400);
    return;
  }
  try {
    const response = await SongService(user);
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

// $(customapi.BASE_URL/chat/time)
router.get('/time', (req, res, next) => {
  try {
    const response = TimeService();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

// $(customapi.BASE_URL/chat/uptime)
router.get('/uptime', (req, res, next) => {
  try {
    const response = UptimeService();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

// $(customapi.BASE_URL/chat/whatnow)
router.get('/whatnow', async (req, res, next) => {
  try {
    const response = await WhatNowService();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

export default router;
