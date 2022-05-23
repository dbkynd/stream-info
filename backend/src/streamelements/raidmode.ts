import { merge } from 'lodash';
import events from '../events';
import logger from '../logger';
import commands from './commands';
import seApi from './se_api';

let followersTimer: NodeJS.Timer, raidModeOffTimer: NodeJS.Timer;
let inAutoRaidMode = false;

async function init() {
  const currentFilters = await seApi.getFilters();
  const emoteFiltersEnabled = currentFilters.botFilters.emotes.enabled;
  // Emote filter ON means raidmode is OFF
  const raidmode = !emoteFiltersEnabled;
  logger.info(`Raidmode data. Enabled: ${raidmode}`);
  events.state.updateAppState({ raidmode });
}

async function setFilters(enabled: boolean): Promise<void> {
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
  if (inAutoRaidMode) {
    timers();
    return;
  }
  inAutoRaidMode = true;
  logger.info('enabling raidmode');
  toggle(true).then(() => {
    commands.say('Raidmode has been enabled.');
    commands.followersOff();
  });
  timers();
}

function timers() {
  if (raidModeOffTimer) clearTimeout(raidModeOffTimer);
  if (followersTimer) clearTimeout(followersTimer);
  raidModeOffTimer = setTimeout(() => {
    commands.announce(
      '10-minute followers-only mode will be enabled in 10 minutes. Please follow to continue chatting.',
    );
    toggle(false).then(() => {
      inAutoRaidMode = false;
    });
  }, 1000 * 60 * 3);

  followersTimer = setTimeout(() => {
    commands.followers(10);
  }, 1000 * 60 * 13);
}

async function toggle(enable: boolean) {
  return setFilters(!enable)
    .then(() => {
      logger.info(`Raidmode toggled. Enabled: ${enable}`);
      events.state.updateAppState({ raidmode: enable });
    })
    .catch((err) => {
      logger.error(err);
      commands.say(`There was an error ${enable ? 'enabling' : 'disabling'} Raidmode.`);
    });
}

export default {
  init,
  auto,
};
