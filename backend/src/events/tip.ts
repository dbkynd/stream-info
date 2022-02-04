import logger from '../logger';
import * as io from '../server/socket.io';

export default (tip: unknown): void => {
  logger.debug('new tip');
  io.emit('tip', tip);
};
