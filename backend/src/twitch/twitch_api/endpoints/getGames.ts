import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-games

export default function getGames(ids: string[]): Promise<TwitchGame[]> {
  const query = ids.map((x) => `id=${x}`).join('&');
  const url = `https://api.twitch.tv/helix/games?${query}`;
  const options = { headers: headers() };
  return axios.get(url, options).then(({ data }: { data: TwitchGameResponse }) => data.data);
}
