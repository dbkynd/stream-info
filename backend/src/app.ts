import * as database from './database';
import * as emotes from './emotes';
import twitchEmoteTimer from './emotes/twitch';
import logger from './logger';
import * as server from './server';
import * as streamelements from './streamelements/se_socket';
import * as token from './token';
import * as appToken from './twitch/twitch_app_token';
import eventSub from './twitch/twitch_eventsub';
import * as twitchIrc from './twitch/twitch_irc';
import * as twitchPolling from './twitch/twitch_polling';

export async function start(): Promise<void> {
  logger.info('Validating token');
  await token.validate();
  await appToken.init();
  await database.connect();
  await emotes.init();
  twitchEmoteTimer.start();
  streamelements.connect();
  await twitchIrc.connect();
  server.start();
  twitchPolling.start();
  await eventSub.subscribe();
}

export async function stop(): Promise<void> {
  const shutdownSequence = [
    twitchPolling.stop,
    server.stop,
    twitchIrc.disconnect,
    streamelements.disconnect,
    twitchEmoteTimer.stop,
    database.disconnect,
  ];

  for (let i = 0; i < shutdownSequence.length; i++) {
    try {
      await shutdownSequence[i]();
    } catch (e) {
      logger.error(e);
    }
  }
}
