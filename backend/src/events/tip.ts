import TipService from '../database/lib/tip';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

export default async (event: SE_WS_Event): Promise<void> => {
  logger.info(`new tip - ${event.data.username}`);

  const payload: TipPayload = event.data as TipPayload; // TODO refine types
  payload.emotes = await emotes.parseTipMessage(event.data.message);

  // Emit to client regardless if successful database save
  const tipDoc = TipService.create(payload, event.createdAt);
  io.emit('tip', tipDoc);
  TipService.save(tipDoc).catch((err) => {
    logger.error(err);
  });
};
