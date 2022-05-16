import tmi from 'tmi.js';
import SubscriptionService from '../database/lib/subscription';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

const lastSubs: { [key: string]: NodeJS.Timeout } = {};

// Cool down on subscription messages to eliminate duplicate events
function isDuplicate(userstate: SubUserstates): boolean {
  const { id } = userstate;
  if (lastSubs[id]) return true;
  lastSubs[id] = setTimeout(() => {
    delete lastSubs[id];
  }, 5000);
  return false;
}

export function newSub(userstate: tmi.SubUserstate): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new subscription - ${userstate.login}`);
  process(userstate);
}

export function resub(userstate: tmi.SubUserstate, message?: string): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new resub - ${userstate.login}`);
  process(userstate, message);
}

export function subgift(userstate: tmi.SubGiftUserstate): void {
  if (isDuplicate(userstate)) return;

  // msg-param-origin-id only occurs on mass gift subs
  // and is used to identify which sub gift belongs to which mass gift
  if (userstate['msg-param-origin-id']) return;

  logger.info(`new subgift - ${userstate.login}`);
  process(userstate);
}

export function submysterygift(userstate: tmi.SubMysteryGiftUserstate): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new submysterygift - ${userstate.login}`);
  process(userstate, undefined);
}

function process(userstate: SubUserstates, message?: string): void {
  const payload: SubscriptionPayload = {
    userstate,
    message,
    emotes: emotes.parseSubMessage(userstate, message),
  };

  // Emit to client regardless if successful database save
  const subscriptionDoc = SubscriptionService.create(payload, userstate['tmi-sent-ts']);
  io.emit('subscription', subscriptionDoc);
  SubscriptionService.save(subscriptionDoc).catch((err) => {
    logger.error(err);
  });
}
