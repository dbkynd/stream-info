import { Client } from 'tmi.js';
import * as io from '../server/socket.io';

const client = new Client({
  channels: ['annemunition'],
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

// https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

client.on('cheer', (channel, userstate, message) => {
  // Do your stuff.
});

client.on('hosted', (channel, username, viewers, autohost) => {
  // Do your stuff.
});

client.on('raided', (channel, username, viewers) => {
  // Do your stuff.
});

client.on('resub', (channel, username, months, message, userstate, methods) => {
  // Do your stuff.
  let cumulativeMonths = ~~userstate['msg-param-cumulative-months'];
});

client.on('roomstate', (channel, state) => {
  io.emit('roomstate', state);
});

client.on(
  'subgift',
  (channel, username, streakMonths, recipient, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate['msg-param-sender-count'];
  },
);

client.on(
  'submysterygift',
  (channel, username, numbOfSubs, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate['msg-param-sender-count'];
  },
);

client.on('subscription', (channel, username, method, message, userstate) => {
  // Do your stuff.
});
