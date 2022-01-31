import axios from '../axios';

export default function validateToken(token: string): Promise<TwitchToken> {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const options = {
    headers: { authorization: `OAuth ${token}` },
  };
  return axios.get(url, options).then(({ data }) => data);
}
