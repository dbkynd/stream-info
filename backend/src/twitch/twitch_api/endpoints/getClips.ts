import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-clips

export default function getClips(
  slugs: string[],
): Promise<(TwitchClip | undefined)[]> {
  const query = slugs
    .map((x) => {
      return `id=${encodeURIComponent(x)}`;
    })
    .join('&');
  const url = `https://api.twitch.tv/helix/clips?${query}`;
  const options = { headers: headers() };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchClipResponse }) => data.data);
}
