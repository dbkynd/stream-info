import Push from 'pushover-notifications';
import logger from './logger';

let client: any;

function init() {
  if (process.env.PUSHOVER_USER && process.env.PUSHOVER_TOKEN) {
    client = new Push({
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
  const msg = { message };

  client.send(msg, function (err: Error) {
    if (err) {
      logger.error(err);
    }
  });
}

export default {
  init,
  push,
};
