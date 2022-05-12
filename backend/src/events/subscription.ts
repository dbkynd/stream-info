import tmi from 'tmi.js';
import SubscriptionService from '../database/lib/subscription';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

interface MassGift {
  recipients: tmi.SubGiftUserstate[];
  targetLength: number;
  timeout: NodeJS.Timeout;
  add(userstate: tmi.SubGiftUserstate): void;
  save(): void;
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

  // msg-param-origin-id only occurs on mass gift subs
  // and is used to identify which gift subs belong to which mass gift
  const id = userstate['msg-param-origin-id'];

  if (id && massGifts[id]) {
    logger.info(`new mass gift recipient - ${userstate['msg-param-recipient-user-name']}`);
    massGifts[id].add(userstate);
  } else {
    logger.info(`new subgift - ${userstate.login}`);
    process(userstate);
  }
}

export function submysterygift(userstate: tmi.SubMysteryGiftUserstate, numOfSubs: number): void {
  if (isDuplicate(userstate)) return;
  logger.info(`new submysterygift - ${userstate.login}`);

  // msg-param-origin-id only occurs on mass gift subs
  // and is used to identify which gift subs belong to which mass gift
  const id = userstate['msg-param-origin-id'];

  massGifts[id] = {
    recipients: [],
    targetLength: numOfSubs,
    timeout: setTimeout(() => {
      massGifts[id].save();
    }, 5000 + numOfSubs * 250),
    add: (userstate) => {
      massGifts[id].recipients.push(userstate);
      if (massGifts[id].recipients.length === massGifts[id].targetLength) {
        massGifts[id].save();
      }
    },
    save: () => {
      if (massGifts[id].timeout) clearTimeout(massGifts[id].timeout);
      process(userstate, undefined, massGifts[id].recipients);
      delete massGifts[id];
    },
  };
}

function process(
  userstate: SubUserstates,
  message?: string,
  recipients?: tmi.SubGiftUserstate[],
): void {
  const payload: SubscriptionPayload = {
    userstate,
    message,
    recipients,
    emotes: emotes.parseSubMessage(userstate, message),
  };

  // Emit to client regardless if successful database save
  const subscriptionDoc = SubscriptionService.create(payload, userstate['tmi-sent-ts']);
  io.emit('subscription', subscriptionDoc);
  SubscriptionService.save(subscriptionDoc).catch((err) => {
    logger.error(err);
  });
}
