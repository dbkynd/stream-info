import express from 'express';
import RaidModeService from '../../services/raidmode/raidmode_service';

const router = express.Router();

router.get('/raidmode', async (req, res, next) => {
  const { action } = req.query as { [key: string]: string | undefined };
  if (!action) {
    res.sendStatus(400);
    return;
  }
  try {
    const response = await RaidModeService(action);
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

router.post('/raidmode', async (req, res, next) => {
  const { action } = req.body as { [key: string]: string | undefined };
  if (!action) {
    res.sendStatus(400);
    return;
  }
  try {
    const response = await RaidModeService(action);
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

export default router;
