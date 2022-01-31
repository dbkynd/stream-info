import express from 'express';
import TimeService from '../../services/time/time_service';
import SongService from '../../services/song/song_service';
import UptimeService from '../../services/uptime/uptime_service';
import ClipService from '../../services/clips/clips_service';

const router = express.Router();

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

// $(customapi.BASE_URL/chat/games) // TODO
// $(customapi.BASE_URL/chat/raidmode?token=token&action=$(1)) // TODO

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

// $(customapi.BASE_URL/chat/whatnow) // TODO

export default router;
