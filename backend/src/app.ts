import * as database from './database';
import logger from './logger';
import * as server from './server';

export async function start(): Promise<void> {
  await database.connect();
  server.start();
}

export async function stop(): Promise<void> {
  const shutdownSequence = [server.stop, database.disconnect];

  for (let i = 0; i < shutdownSequence.length; i++) {
    try {
      await shutdownSequence[i]();
    } catch (e) {
      logger.error(e);
    }
  }
}
