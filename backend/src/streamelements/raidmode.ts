import { merge } from 'lodash';
import User from '../database/lib/user';
import { updateAppState } from '../events/state';
import logger from '../logger';
import { getChannelId } from '../token';
import commands from './commands';
import seApi from './se_api';

let followersTimer: NodeJS.Timer, raidModeOffTimer: NodeJS.Timer;
let inRaidMode = false;

async function init() {
  const currentFilters = await seApi.getFilters();
  const emoteFiltersEnabled = currentFilters.botFilters.emotes.enabled;
  // Emote filter ON means raidmode is OFF
  inRaidMode = !emoteFiltersEnabled;
  logger.info(`Raidmode data. Enabled: ${inRaidMode}`);
  updateAppState({ raidmode: inRaidMode });
}

async function setFilters(enabled: boolean): Promise<void> {
  logger.debug('settings streamelements filters');
  if (process.env.NO_ACTIONS) return;
  const currentFilters = await seApi.getFilters();
  const body: SEFiltersResponse & { banphrases: string[] } = merge(currentFilters, {
    botFilters: {
      emotes: { enabled },
      caps: { enabled },
    },
    banphrases: currentFilters.banphrases.map((x) => x._id),
  });
  await seApi.putFilters(body);
}

function auto() {
  logger.debug('auto raidmode triggered');
  if (process.env.NODE_ENV !== 'production') return;
  if (inRaidMode) {
    timers();
    return;
  }
  inRaidMode = true;
  logger.info('enabling raidmode');
  toggle(true).then(() => {
    commands.say('Raidmode has been enabled.');
    commands.followersOff();
  });
  timers();
}

async function manual(enable: boolean): Promise<string> {
  logger.debug(`manual raidmode trigger - enable: ${enable}`);
  if (enable) {
    if (inRaidMode) {
      return 'Raidmode already enabled.';
    } else {
      inRaidMode = true;
      await toggle(true);
      await commands.followersOff();
      return 'Raidmode has been enabled.';
    }
  } else {
    if (inRaidMode) {
      inRaidMode = false;
      clearTimeout(followersTimer);
      clearTimeout(raidModeOffTimer);
      await toggle(false);
      const minutes = (await User.getUserSettings(getChannelId()))?.defaultFollowers || 10;
      await commands.followers(minutes);
      return 'Raidmode has been disabled.';
    } else {
      return 'Raidmode currently disabled.';
    }
  }
}

async function timers() {
  if (raidModeOffTimer) clearTimeout(raidModeOffTimer);
  if (followersTimer) clearTimeout(followersTimer);
  const minutes = (await User.getUserSettings(getChannelId()))?.defaultFollowers || 10;
  raidModeOffTimer = setTimeout(
    async () => {
      commands.announce(
        `${minutes}-minute followers-only mode will be enabled in ${minutes} minutes. Please follow to continue chatting.`,
      );
      toggle(false).then(() => {
        inRaidMode = false;
      });
    },
    1000 * 60 * 3,
  );

  followersTimer = setTimeout(
    async () => {
      commands.followers(minutes);
    },
    1000 * 60 * minutes + 3,
  );
}

async function toggle(enable: boolean) {
  return setFilters(!enable)
    .then(() => {
      logger.info(`Raidmode toggled. Enabled: ${enable}`);
      updateAppState({ raidmode: enable });
    })
    .catch((err) => {
      logger.error(err);
      commands.say(`There was an error ${enable ? 'enabling' : 'disabling'} Raidmode.`);
    });
}

export default {
  init,
  auto,
  manual,
};
