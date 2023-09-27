import axios from 'axios';
import logger from './logger';
import twitchApi from './twitch/twitch_api';

const requiredScopes = [
  'bits:read',
  'channel:edit:commercial',
  'channel:moderate',
  'channel:read:redemptions',
  'channel:read:subscriptions',
  'chat:edit',
  'chat:read',
  'clips:edit',
  'moderation:read',
];

interface Keys {
  access_token: string;
  client_id: string;
}

let validToken = false;
let keys: Keys;
let channel: string;
let id: string;

export function isValid(): boolean {
  return validToken;
}

export function getKeys(): Keys {
  return keys;
}

export function getChannelName(): string {
  return channel;
}

export function getChannelId(): string {
  return id;
}

export function getScopes(): string[] {
  return requiredScopes;
}

let timer: NodeJS.Timeout;
function startTimer(): void {
  timer = setTimeout(validate, 1000 * 60 * 60);
}

export async function validate(): Promise<void> {
  logger.debug('checking token validity');
  if (timer) clearTimeout(timer);
  const awsKeys: Keys = await getAWSKeys();
  // if (process.env.NODE_ENV === 'production') {
  //awsKeys = await getAWSKeys();
  //} else {
  //   awsKeys = {
  //    client_id: process.env.TWITCH_CLIENT_ID,
  //   access_token: process.env.DEV_ACCESS_TOKEN,
  //  };
  // }
  await twitchApi
    .validateToken(awsKeys.access_token)
    .then(({ scopes, login, user_id }) => {
      logger.debug('token is valid');
      if (hasScopes(scopes)) {
        id = user_id;
        channel = login;
        keys = awsKeys;
        validToken = true;
      } else {
        setInvalid();
      }
    })
    .catch(({ response }) => {
      if (response.status === 401) {
        logger.warn('Twitch Token is invalid!');
        setInvalid();
      }
    })
    .finally(() => {
      startTimer();
    });
}

function setInvalid(): void {
  validToken = false;
  // TODO: message client that token is invalid? socket
}

export function hasScopes(scopes: string[]): boolean {
  for (let i = 0; i < requiredScopes.length; i++) {
    if (!scopes.includes(requiredScopes[i])) {
      logger.warn(`Twitch Token missing scopes! - ${requiredScopes[i]}`);
      return false;
    }
  }
  return true;
}

async function getAWSKeys(): Promise<Keys> {
  logger.debug('getting keys from aws');
  return axios
    .get(process.env.TOKEN_AWS_URL, {
      headers: {
        'x-api-key': process.env.TOKEN_AWS_API_KEY,
      },
    })
    .then(({ data }) => {
      return data;
    });
}
