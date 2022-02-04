import logger from '../logger';
import * as io from '../server/socket.io';

interface HostData {
  username: string;
  viewers: number;
  autohost: boolean;
  raid: boolean;
}

export default (host: HostData): void => {
  logger.debug('new host/raid');
  io.emit('host', host);
};
