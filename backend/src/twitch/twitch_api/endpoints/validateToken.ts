import axios from '../axios';

// https://dev.twitch.tv/docs/authentication#validating-requests

export default function validateToken(token: string): Promise<TwitchToken> {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const options = {
    headers: { authorization: `OAuth ${token}` },
  };
  return axios.get(url, options).then(({ data }: { data: TwitchToken }) => data);
}
