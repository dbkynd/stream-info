import express from 'express';
import SusTermService from '../../../database/lib/sus_terms';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await SusTermService.list();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await SusTermService.create(req.body);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  try {
    await SusTermService.remove(id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  try {
    await SusTermService.update(id, req.body);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
