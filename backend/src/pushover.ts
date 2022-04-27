import Pushover from 'pushover-notifications';
import logger from './logger';

let client: Pushover;

function init() {
  if (process.env.PUSHOVER_USER && process.env.PUSHOVER_TOKEN) {
    client = new Pushover({
      user: process.env.PUSHOVER_USER,
      token: process.env.PUSHOVER_TOKEN,
      onerror: onError,
    });
    logger.info('Ready to send pushover notifications.');
  } else {
    logger.warn('Unable to init Pushover Notifications');
  }
}

function onError(err: Error) {
  logger.error(err);
}

// https://pushover.net/api
function push(message: string) {
  if (!client) return;

  client.send({ message }, function (err: Error) {
    if (err) {
      logger.error(err);
    }
  });
}

export default {
  init,
  push,
};
