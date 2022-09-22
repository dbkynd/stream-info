import axios from 'axios';
import { DateTime, Duration } from 'luxon';
import logger from '../logger';

let token: string;
let refreshDateTime: DateTime;

export function getToken() {
  return token;
}

async function refreshToken(): Promise<void> {
  logger.info('Refreshing Twitch App Token');
  return axios
    .post('https://id.twitch.tv/oauth2/token', {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })
    .then(({ data }: { data: TwitchAppToken }) => {
      logger.info('Twitch App Token Set');
      token = data.access_token;
      const duration = Duration.fromObject({ seconds: data.expires_in });
      const padding = Duration.fromObject({ hours: 2 });
      const now = DateTime.now();
      refreshDateTime = now.plus(duration).minus(padding);
      logger.debug(`refreshing token at ${refreshDateTime.toISO()}`);
    });
}

export async function init(): Promise<void> {
  await refreshToken();
  setInterval(checkRefresh, 1000 * 60 * 30);
}

function checkRefresh() {
  if (!refreshDateTime) return;
  const now = DateTime.now();
  if (refreshDateTime < now) refreshToken();
}
