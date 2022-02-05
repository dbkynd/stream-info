import tmi from 'tmi.js';
import logger from '../logger';
import * as io from '../server/socket.io';

interface StatusUpdate {
  seWs?: boolean;
  twitchIrc?: boolean;
}

export function update(data: StatusUpdate): void {
  logger.debug('status update');
  io.emit('status', data);
}

export function roomstate(state: tmi.RoomState): void {
  logger.debug('new roomstate');
  io.emit('roomstate', state);
}
