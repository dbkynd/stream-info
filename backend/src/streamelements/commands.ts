import logger from '../logger';
import seApi from './se_api';

async function say(message: string) {
  logger.debug(`se SAY: ${message}`);
  if (!process.env.NO_ACTIONS) {
    try {
      await seApi.postChannelSay(message);
    } catch (e) {
      logger.error(e);
    }
  }
}

async function announce(message: string) {
  await say(`/announce ${message}`);
}

async function followersOff() {
  await say('/followersoff');
}

async function followers(minutes?: number) {
  if (!minutes) await say('/followers');
  else await say(`/followers ${minutes}`);
}

export default {
  say,
  announce,
  followersOff,
  followers,
};
