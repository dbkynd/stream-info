import tmi from 'tmi.js';
import * as io from '../server/socket.io';

interface StatusUpdate {
  twitchTmi?: boolean;
}

export function update(data: StatusUpdate): void {
  console.log('status update', data);
  io.emit('status', data);
}

export function roomstate(state: tmi.RoomState): void {
  console.log('new roomstate');
  io.emit('roomstate', state);
}
