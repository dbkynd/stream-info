import express from 'express';
import TimeService from '../../services/time/time_service';
import SongService from '../../services/song/song_service';
import UptimeService from '../../services/uptime/uptime_service';

const router = express.Router();

// $(customapi.BASE_URL/chat/clips?token=token&action=$(1)&target=$(2)) // TODO
// $(customapi.BASE_URL/chat/games) // TODO
// $(customapi.BASE_URL/chat/raidmode?token=token&action=$(1)) // TODO

// $(customapi.BASE_URL/chat/song?user=dbkynd)
router.get('/song', async (req, res, next) => {
  const { user } = req.query;
  if (!user || typeof user !== 'string') {
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
