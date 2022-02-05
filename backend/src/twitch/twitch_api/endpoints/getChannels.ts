import axios from '../axios';
import headers from '../headers';

//https://dev.twitch.tv/docs/api/reference#get-channel-information

export default function getChannels(
  ids: string[],
): Promise<(TwitchChannel | undefined)[]> {
  const query = ids
    .map((x) => {
      return `broadcaster_id=${encodeURIComponent(x)}`;
    })
    .join('&');
  const url = `https://api.twitch.tv/helix/channels?${query}`;
  const options = { headers: headers() };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchChannelResponse }) => data.data);
}
