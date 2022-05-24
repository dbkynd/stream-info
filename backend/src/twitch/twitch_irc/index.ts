import tmi, { Client } from 'tmi.js';
import events from '../../events';
import logger from '../../logger';
import messageHandler from './message_handler';

const channel = 'annemunition'; // todo

// https://tmijs.com/

const client = new tmi.Client({
  channels: [channel],
  identity: {
    username: 'annemunition',
    password: `oauth:${process.env.TOKEN}`,
  },
  options: {
    skipMembership: true,
    skipUpdatingEmotesets: true,
  },
});

export async function connect(): Promise<void> {
  await client.connect();
  logger.info(`Connected to Twitch channel: ${channel} as: ${client.getUsername()}`);
}

export async function disconnect(): Promise<void> {
  await client.disconnect();
  logger.info('Disconnected from Twitch IRC');
}

client.on('connected', () => {
  events.state.updateAppState({ twitchIrc: true });
});

client.on('disconnected', () => {
  events.state.updateAppState({ twitchIrc: false });
});

// https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

// Username is continuing the Gift Sub they got from an anonymous user in channel.
client.on('anongiftpaidupgrade', (_channel, _username, userstate) => {
  try {
    events.subscription.paidUpgrade(userstate);
  } catch (e) {
    logger.error(e);
  }
});

// Username has cheered to a channel.
client.on('cheer', async (_channel, userstate, message) => {
  try {
    await events.cheer(userstate, message);
  } catch (e) {
    logger.error(e);
  }
});

// Username is continuing the Gift Sub they got from sender in channel.
client.on('giftpaidupgrade', (_channel, _username, _sender, userstate) => {
  try {
    events.subscription.paidUpgrade(userstate);
  } catch (e) {
    logger.error(e);
  }
});

// Channel is now hosted by another broadcaster.
client.on('hosted', async (_channel, username, viewers, autohost) => {
  try {
    await events.hosted({
      username,
      viewers,
      autohost,
      raid: false,
    });
  } catch (e) {
    logger.error(e);
  }
});

// Received a message. This event is fired whenever you receive a chat, action or whisper message.
client.on('message', (_channel, userstate, message, _self) => {
  try {
    messageHandler(userstate, message);
  } catch (e) {
    logger.error(e);
  }
});

// User is upgrading from Prime to a normal tier sub
client.on('primepaidupgrade', (_channel, _username, _methods, userstate) => {
  try {
    events.subscription.paidUpgrade(userstate);
  } catch (e) {
    logger.error(e);
  }
});

// Channel is now being raided by another broadcaster.
client.on('raided', async (_channel, username, viewers) => {
  try {
    await events.hosted({
      username,
      viewers,
      autohost: false,
      raid: true,
    });
  } catch (e) {
    logger.error(e);
  }
});

// Username has resubbed on a channel.
client.on('resub', (_channel, _username, _months, message, userstate, _methods) => {
  try {
    events.subscription.resub(userstate, message);
  } catch (e) {
    logger.error(e);
  }
});

// The current state of the channel.
client.on('roomstate', (_channel, state) => {
  try {
    events.state.setRoomstate(state);
  } catch (e) {
    logger.error(e);
  }
});

// Username gifted a subscription to recipient in a channel.
client.on('subgift', (_channel, _username, _streakMonths, _recipient, _methods, userstate) => {
  try {
    events.subscription.subgift(userstate);
  } catch (e) {
    logger.error(e);
  }
});

// Username is gifting a subscription to someone in a channel.
client.on('submysterygift', (_channel, _username, numOfSubs, _methods, userstate) => {
  try {
    events.subscription.submysterygift(userstate, numOfSubs);
  } catch (e) {
    logger.error(e);
  }
});

// Username has subscribed to a channel.
client.on('subscription', (_channel, _username, _method, _message, userstate) => {
  try {
    events.subscription.newSub(userstate);
  } catch (e) {
    logger.error(e);
  }
});

// https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Commands.md

export async function deleteMessage(messageUUID: string): Promise<void> {
  logger.debug(`twitch DELETE_MESSAGE: ${messageUUID}`);
  if (!process.env.NO_ACTIONS) {
    try {
      await client.deletemessage(channel, messageUUID);
    } catch (e) {
      logger.error(e);
    }
  }
}

export async function say(message: string): Promise<void> {
  logger.debug(`twitch SAY: ${message}`);
  if (!process.env.NO_ACTIONS) {
    try {
      await client.say(channel, message);
    } catch (e) {
      logger.error(e);
    }
  }
}

export function getClient(): Client {
  return client;
}
