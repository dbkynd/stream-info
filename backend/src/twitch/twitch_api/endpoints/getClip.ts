import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-clips

export default function getClip(slug: string): Promise<TwitchClip[]> {
  const url = `https://api.twitch.tv/helix/clips?id=${slug}`;
  const options = { headers: headers() };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchClipResponse }) => data.data);
}
