import tmi from 'tmi.js';
import logger from '../logger';
import * as io from '../server/socket.io';

export default (userstate: tmi.ChatUserstate): void => {
  logger.debug('new cheer');
  io.emit('cheer', userstate);
};
