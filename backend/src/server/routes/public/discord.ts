import { Router } from 'express';
import multer from 'multer';
import LegacyRoleRequestService from '../../services/discord/legacy_role_service';
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

router.post('/legacy_role', async (req, res, next) => {
  const { discordName, discordId, twitchName, twitchId } = req.body;

  if (!discordName || !discordId || !twitchName || !twitchId) {
    res.sendStatus(400);
    return;
  }

  try {
    await LegacyRoleRequestService(
      discordName,
      discordId,
      twitchName,
      twitchId,
    );
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
