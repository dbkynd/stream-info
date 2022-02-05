import TipService from '../database/lib/tip';
import logger from '../logger';
import * as io from '../server/socket.io';

export default (event: SE_WS_Event): void => {
  logger.debug('new tip');

  const payload: TipPayload = event.data as TipPayload; // TODO refine types

  // Emit to client regardless if successful database save
  const tipDoc = TipService.create(payload, event.createdAt);
  io.emit('tip', tipDoc);
  TipService.save(tipDoc).catch();
};
