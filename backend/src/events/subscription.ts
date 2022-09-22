import tmi from 'tmi.js';
import SubscriptionService from '../database/lib/subscription';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

interface MassGift {
  recipients: string[];
  targetLength: number;
  timeout: NodeJS.Timeout;
  add(id: string): void;
  expire(): void;
}

const lastSubs: { [key: string]: NodeJS.Timeout } = {};
const massGifts: { [key: string]: MassGift } = {};

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

  const id = userstate['msg-param-origin-id'];

  if (id && massGifts[id]) {
    massGifts[id].add(userstate.id as string);
  } else {
    logger.info(`new subgift - ${userstate.login}`);
    process(userstate);
  }
}

export function submysterygift(userstate: tmi.SubMysteryGiftUserstate, numOfSubs: number): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new submysterygift - ${userstate.login}`);
  process(userstate);

  const id = userstate['msg-param-origin-id'];

  massGifts[id] = {
    recipients: [],
    targetLength: numOfSubs,
    timeout: setTimeout(() => {
      massGifts[id].expire();
    }, 10000 + numOfSubs * 250),
    add: (id: string) => {
      massGifts[id].recipients.push(id);
      if (massGifts[id].recipients.length === massGifts[id].targetLength) {
        massGifts[id].expire();
      }
    },
    expire: () => {
      if (massGifts[id].timeout) clearTimeout(massGifts[id].timeout);
      delete massGifts[id];
    },
  };
}

export function paidUpgrade(userstate: UpgradeUserstates): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new ${userstate['msg-id']} - ${userstate.login}`);
  process(userstate);
}

function process(userstate: SubUserstates | UpgradeUserstates, message?: string): void {
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
