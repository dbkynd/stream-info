import * as database from './database';
import logger from './logger';
import * as server from './server';
import * as streamelements from './streamelements/se_socket';
import * as token from './token';
import * as twitchIrc from './twitch/twitch_irc';

export async function start(): Promise<void> {
  logger.info('Validating token');
  await token.validate();
  await database.connect();
  streamelements.connect();
  await twitchIrc.connect();
  server.start();
}

export async function stop(): Promise<void> {
  const shutdownSequence = [
    server.stop,
    twitchIrc.disconnect,
    streamelements.disconnect,
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
