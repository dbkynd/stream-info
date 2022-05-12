import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { cacheDir } from '../../directories';
import logger from '../../logger';
import twitchApi from '../twitch_api';

const subscribersFile = path.join(cacheDir, 'subscribers.json');
let subscribers: string[] = [];
let liveSubs: TwitchStream[] = [];

let getSubsTimer: NodeJS.Timer;
let checkLiveTimer: NodeJS.Timer;

export async function start() {
  loadFromFile();
  if (subscribers.length) {
    logger.debug(`Loaded ${subscribers.length} subscribers from file.`);
  } else {
    logger.debug('No subscribers found in local cache.');
    await getSubs();
  }
  checkLive();
  getSubsTimer = setInterval(getSubs, 1000 * 60 * 60 * 8);
  checkLiveTimer = setInterval(checkLive, 1000 * 60 * 10);
}

export function stop() {
  if (getSubsTimer) clearInterval(getSubsTimer);
  if (checkLiveTimer) clearInterval(checkLiveTimer);
}

function loadFromFile(): void {
  if (fs.existsSync(subscribersFile)) {
    logger.debug('Loading Subscribers from local file.');
    subscribers = JSON.parse(fs.readFileSync(subscribersFile, { encoding: 'utf-8' }));
  }
}

async function getSubs() {
  logger.debug('Caching subscribers...');
  const initialRequest = await twitchApi.getSubscriptions(1);
  const requestCount = Math.ceil(initialRequest.total / 100);
  const subs: TwitchSubscription[] = [];
  let cursor: string | undefined;

  for (let i = 0; i < requestCount; i++) {
    // logger.debug(`Subscribers chunk: ${i + 1} of ${requestCount}`);
    const chunk = await twitchApi.getSubscriptions(100, cursor);
    if (chunk.pagination?.cursor) cursor = chunk.pagination.cursor;
    subs.push(...chunk.data);
    await dwell();
  }

  const unique = _.uniq(subs.map((x) => x.user_id));
  if (!unique.length) return;
  subscribers = unique;
  logger.debug(`Done getting Subscribers (${subscribers.length})`);
  fs.writeFile(subscribersFile, JSON.stringify(subscribers), { encoding: 'utf8' }, (err) => {
    if (err) logger.error(err);
  });
}

async function checkLive() {
  if (subscribers.length === 0) return;
  logger.debug('Caching live sub streams...');
  const requestCount = Math.ceil(subscribers.length / 100);
  const live: TwitchStream[] = [];

  const ids = _.chunk(subscribers, 100);
  for (let i = 0; i < requestCount; i++) {
    // logger.debug(`Streams chunk: ${i + 1} of ${requestCount}`);
    const chunk = await twitchApi.getStreams(ids[i]);
    live.push(...chunk);
    await dwell();
  }

  liveSubs = _.uniqBy(live, 'user_id');
  logger.debug(`Done caching live sub streams (${liveSubs.length})`);
}

function dwell(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

export function getLiveSubs(): TwitchStream[] {
  return liveSubs;
}
