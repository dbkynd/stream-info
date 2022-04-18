import crypto from 'crypto';
import express from 'express';
import _ from 'lodash';
import { DateTime } from 'luxon';
import logger from '../../logger';
import susFollowerHandler from '../suspicious_followers';
import twitchApi from '../twitch_api';
import events from './events';
import secret from './secret';

const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();
const MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();

const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

const HMAC_PREFIX = 'sha256=';

const lastMessageIds: string[] = [];

function verify(req: express.Request): boolean {
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message);
  return verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE] as string);
}

function getHmacMessage(req: express.Request) {
  return (
    (((req.headers[TWITCH_MESSAGE_ID] as string) +
      req.headers[TWITCH_MESSAGE_TIMESTAMP]) as string) + JSON.stringify(req.body)
  );
}

function getHmac(secret: string, message: string) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

function verifyMessage(hmac: string, verifySignature: string) {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}

function challengeHandler(req: express.Request): string | undefined {
  if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
    return req.body.challenge;
  }
}

function eventHandler(req: express.Request): void {
  const notification = req.body;
  if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TYPE]) {
    if (isDuplicate(req.headers[MESSAGE_ID] as string)) return;
    if (isOld(req.headers[MESSAGE_TIMESTAMP] as string)) return;
    if (
      notification.subscription.type === 'channel.follow' &&
      notification.event.broadcaster_user_id === '51533859' // TODO
    ) {
      try {
        susFollowerHandler(notification.event);
      } catch (e) {
        logger.error(e);
      }
    }
  } else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
    console.log(`${notification.subscription.type} notifications revoked!`);
    console.log(`reason: ${notification.subscription.status}`);
    console.log(`condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`);
  }
}

function isDuplicate(id: string): boolean {
  if (lastMessageIds.includes(id)) return true;
  lastMessageIds.push(id);
  if (lastMessageIds.length > 20) lastMessageIds.shift();
  return false;
}

function isOld(timestamp: string): boolean {
  const now = DateTime.now();
  const messageTime = DateTime.fromISO(timestamp);
  return messageTime.plus(1000 * 60 * 10) < now;
}

async function subscribe() {
  const currentSubs = await twitchApi.getEventSub();
  for (let i = 0; i < currentSubs.length; i++) {
    await twitchApi.deleteEventSub(currentSubs[i].id);
  }
  const e = events();
  for (let i = 0; i < e.length; i++) {
    await twitchApi.createEventSub(e[i]);
  }
}

export default {
  verify,
  challengeHandler,
  eventHandler,
  subscribe,
};
