import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-streams

export default function getStreams(
  identities: string[],
): Promise<TwitchStream[]> {
  const query = identities
    .map((x) => {
      const type = /^\d+$/.test(x) ? 'user_id' : 'user_login';
      return `${type}=${encodeURIComponent(x)}`;
    })
    .join('&');
  const url = `https://api.twitch.tv/helix/streams?${query}`;
  const options = { headers: headers() };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchStreamResponse }) => data.data);
}
