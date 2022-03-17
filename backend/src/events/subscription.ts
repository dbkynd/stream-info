import tmi from 'tmi.js';
import SubscriptionService from '../database/lib/subscription';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

interface MassGift {
  recipients: tmi.SubGiftUserstate[];
  targetLength: number;
  timeout: NodeJS.Timeout;
  save(): void;
}

const lastSubs: { [key: string]: NodeJS.Timeout } = {};
const massGifts: { [key: string]: MassGift } = {};

// Cooldown on subscription messages to eliminate duplicate events
function isDuplicate(userstate: SubUserstates): boolean {
  const id = userstate['msg-param-recipient-id'] || userstate['user-id'];
  if (lastSubs[id]) return true;
  lastSubs[id] = setTimeout(() => {
    delete lastSubs[id];
  }, 2000);
  return false;
}

export function newSub(userstate: tmi.SubUserstate): void {
  if (isDuplicate(userstate)) return;
  logger.debug('new subscription');
  process(userstate).then();
}

export function resub(userstate: tmi.SubUserstate, message?: string): void {
  if (isDuplicate(userstate)) return;
  logger.debug('new resub');
  process(userstate, message).then();
}

export function subgift(userstate: tmi.SubGiftUserstate): void {
  if (isDuplicate(userstate)) return;
  const id = userstate['user-id'];
  if (!id) return;

  logger.debug('new subgift');

  if (massGifts[id]) {
    massGifts[id].recipients.push(userstate);
    if (massGifts[id].recipients.length === massGifts[id].targetLength) {
      massGifts[id].save();
    }
  } else {
    // Process single subgift if not a mass gift
    process(userstate).then();
  }
}

export function submysterygift(
  userstate: tmi.SubMysteryGiftUserstate,
  numOfSubs: number,
): void {
  if (isDuplicate(userstate)) return;
  const id = userstate['user-id'];
  if (!id) return;

  logger.debug('new submysterygift');
  massGifts[id] = {
    recipients: [],
    targetLength: numOfSubs,
    timeout: setTimeout(() => {
      massGifts[id].save();
    }, 5000 + numOfSubs * 250),
    save: () => {
      if (massGifts[id].timeout) clearTimeout(massGifts[id].timeout);
      process(userstate, undefined, massGifts[id].recipients).then();
    },
  };
}

async function process(
  userstate: SubUserstates,
  message?: string,
  recipients?: tmi.SubGiftUserstate[],
): Promise<void> {
  const payload: SubscriptionPayload = {
    userstate,
    message,
    recipients,
    emotes: await emotes.parseMessage(message),
  };

  // Emit to client regardless if successful database save
  const subscriptionDoc = SubscriptionService.create(
    payload,
    userstate['tmi-sent-ts'],
  );
  io.emit('subscription', subscriptionDoc);
  SubscriptionService.save(subscriptionDoc).catch();
}
