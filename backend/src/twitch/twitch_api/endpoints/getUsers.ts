import axios from '../axios';
import headers from '../headers';

//https://dev.twitch.tv/docs/api/reference#get-users

export default function getUsers(identities: string[]): Promise<TwitchUser[]> {
  const query = identities
    .map((x) => {
      const type = /^\d+$/.test(x) ? 'id' : 'login';
      return `${type}=${encodeURIComponent(x)}`;
    })
    .join('&');
  const url = `https://api.twitch.tv/helix/users?${query}`;
  const options = { headers: headers() };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchUserResponse }) => data.data);
}
