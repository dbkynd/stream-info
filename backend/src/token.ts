import axios from 'axios';
import logger from './logger';
import twitchApi from './twitch/twitch_api';

const requiredScopes = [
  'bits:read',
  'channel:moderate',
  'channel:read:subscriptions',
  'channel_check_subscription',
  'channel_subscriptions',
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

export function isValid(): boolean {
  return validToken;
}

export function getKeys(): Keys {
  return keys;
}

export function getScopes(): string[] {
  return requiredScopes;
}

let timer: NodeJS.Timer;
function startTimer(): void {
  timer = setTimeout(validate, 1000 * 60 * 60);
}

export async function validate(): Promise<void> {
  logger.debug('checking token validity');
  if (timer) clearTimeout(timer);
  const awsKeys = await getAWSKeys();
  twitchApi
    .validateToken(awsKeys.access_token)
    .then(({ scopes }) => {
      logger.debug('token is valid');
      if (hasScopes(scopes)) {
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
  for (let i = 0; i < scopes.length; i++) {
    if (!requiredScopes.includes(scopes[i])) {
      logger.warn('token missing scopes');
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
