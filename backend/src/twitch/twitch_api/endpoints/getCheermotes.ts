import { getChannelId } from '../../../token';
import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-cheermotes

export default async function getSubscriptions(): Promise<Cheermote[]> {
  const url = 'https://api.twitch.tv/helix/bits/cheermotes';
  const options = {
    headers: headers(),
    params: {
      broadcaster_id: getChannelId(),
    },
  };
  return axios.get(url, options).then(({ data }: { data: TwitchCheermoteResponse }) => data.data);
}
