import { Client } from 'tmi.js';
import events from '../events';

const channel = 'annemunition'; // todo

const client = new Client({
  channels: [channel],
  options: {
    skipMembership: true,
  },
});

export function connect(): Promise<void> {
  return new Promise((resolve, reject) => {
    client.connect().catch(reject);
    client.once('connected', () => {
      resolve();
    });
  });
}

export function disconnect(): Promise<void> {
  return new Promise((resolve, reject) => {
    client
      .disconnect()
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}

client.once('connected', () => {
  events.status.update({ twitchTmi: true });
});

client.on('disconnected', () => {
  events.status.update({ twitchTmi: false });
});

// https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

// Username has cheered to a channel.
client.on('cheer', (channel, userstate, message) => {
  events.cheer(userstate);
});

// Channel is now hosted by another broadcaster.
client.on('hosted', (channel, username, viewers, autohost) => {
  events.hosted({
    username,
    viewers,
    autohost,
    raid: false,
  });
});

// Channel is now being raided by another broadcaster.
client.on('raided', (channel, username, viewers) => {
  events.hosted({
    username,
    viewers,
    autohost: false,
    raid: true,
  });
});

// Username has resubbed on a channel.
client.on('resub', (channel, username, months, message, userstate, methods) => {
  events.subscription.resub(userstate);
});

// The current state of the channel.
client.on('roomstate', (channel, state) => {
  events.status.roomstate(state);
});

// Username gifted a subscription to recipient in a channel.
client.on(
  'subgift',
  (channel, username, streakMonths, recipient, methods, userstate) => {
    events.subscription.subgift(userstate);
  },
);

// Username is gifting a subscription to someone in a channel.
client.on(
  'submysterygift',
  (channel, username, numbOfSubs, methods, userstate) => {
    events.subscription.submysterygift(userstate);
  },
);

// Username has subscribed to a channel.
client.on('subscription', (channel, username, method, message, userstate) => {
  events.subscription.newSub(userstate);
});

// https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Commands.md

export function deleteMessage(messageUUID: string): void {
  client.deletemessage(channel, messageUUID).catch();
}
