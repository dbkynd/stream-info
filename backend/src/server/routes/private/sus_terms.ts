import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    // TODO get record from database
    const response = {
      _id: '1',
      name: 'Some Term',
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    // TODO delete record
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    // TODO update record
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
