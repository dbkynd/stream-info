import * as app from './app';
import logger from './logger';
import pushover from './pushover';

logger.info('Application starting...');

app
  .start()
  .then(() => {
    logger.info('Startup complete');
  })
  .catch((err) => {
    logger.error(err.message);
    process.exit(1);
  });

const signals: NodeJS.Signals[] = ['SIGHUP', 'SIGINT', 'SIGTERM'];

signals.forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal);
  });
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info(`Received a ${signal} signal. Attempting graceful shutdown...`);
  app.stop().finally(() => {
    logger.info(`Shutdown completed. Exiting.`);
    process.exit(0);
  });
};

process.on('uncaughtException', (err) => {
  if (err) {
    if (err.stack) {
      pushover.push(err.message + '\n\n' + err.stack.split('\n').slice(0, 7).join('\n'));
    } else if (err.message) {
      pushover.push(err.message);
    }
    logger.error(err);
  }
});

process.on('unhandledRejection', (err: Error) => {
  if (err) {
    if (err.stack) {
      pushover.push(err.message + '\n\n' + err.stack.split('\n').slice(0, 7).join('\n'));
    } else if (err.message) {
      pushover.push(err.message);
    }
    logger.error(err);
  }
});
