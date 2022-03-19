import TipService from '../database/lib/tip';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

export default async (event: SE_WS_Event): Promise<void> => {
  logger.debug('new tip');

  const payload: TipPayload = event.data as TipPayload; // TODO refine types

  // Emit to client regardless if successful database save
  const tipDoc = TipService.create(payload, event.createdAt);
  io.emit('tip', {
    ...tipDoc,
    emotes: await emotes.parseTipMessage(event.data.message),
  });
  TipService.save(tipDoc).catch((err) => {
    logger.error(err);
  });
};
