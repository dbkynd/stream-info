import express from 'express';
import CheerService from '../../../database/lib/cheer';
import HostService from '../../../database/lib/host';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.get('/user', (req, res, next) => {
  res.status(200).json(req.user);
});

router.get('/lists', async (req, res, next) => {
  try {
    const payload = {
      cheers: await CheerService.list(),
      hosts: await HostService.list(),
    };
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
});

export default router;
