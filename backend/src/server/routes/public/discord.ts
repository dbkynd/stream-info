import { Router } from 'express';
import multer from 'multer';
import UserReportService from '../../services/discord/user_report_service';

const router = Router();

router.post('/user_report', multer().array('files'), async (req, res, next) => {
  const { reporter, reported, message } = req.body;

  if (!reporter || !reported || !message) {
    res.sendStatus(400);
    return;
  }

  try {
    await UserReportService(
      reporter,
      reported,
      message,
      req.files as Express.Multer.File[],
    );
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
