import tmi from 'tmi.js';
import logger from '../logger';
import * as io from '../server/socket.io';

export function newSub(userstate: tmi.SubUserstate): void {
  logger.debug('new subscription');
  process(userstate);
}

export function resub(userstate: tmi.SubUserstate, message?: string): void {
  logger.debug('new resub');
  // let cumulativeMonths = ~~userstate['msg-param-cumulative-months'];
  process(userstate);
}

export function subgift(userstate: tmi.SubGiftUserstate): void {
  logger.debug('new subgift');
  // let senderCount = ~~userstate['msg-param-sender-count'];
  process(userstate);
}

export function submysterygift(userstate: tmi.SubMysteryGiftUserstate): void {
  logger.debug('new submysterygift');
  // let senderCount = ~~userstate['msg-param-sender-count'];
  process(userstate);
}

function process(data: unknown): void {
  io.emit('subscription', data);
}
