import axios from '../axios';
import headers from '../headers';

export default function getUsers(identities: string[]): Promise<HelixUser[]> {
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
    .then(({ data }: { data: HelixUserResponse }) => data.data);
}
