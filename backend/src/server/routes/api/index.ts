import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

router.get('/user', (req, res, next) => {
  res.status(200).json(req.user);
});

export default router;
