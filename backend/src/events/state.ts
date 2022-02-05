import tmi from 'tmi.js';
import logger from '../logger';
import * as io from '../server/socket.io';

interface ApplicationState {
  seWs?: boolean;
  twitchIrc?: boolean;
}

let appState: ApplicationState;
let roomstate: tmi.RoomState;

export function updateAppState(state: ApplicationState): void {
  logger.debug('state update');
  appState = Object.assign({}, appState, state);
  io.emit('appState', state);
}

export function getAppState(): ApplicationState {
  return appState;
}

export function setRoomstate(state: tmi.RoomState): void {
  logger.debug('new roomstate');
  roomstate = state;
  io.emit('roomstate', state);
}

export function getRoomstate(): tmi.RoomState {
  return roomstate;
}
