import { getChannelId } from '../../../token';
import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#start-commercial

export default function startCommercial(length: number): Promise<void> {
  const url = 'https://api.twitch.tv/helix/channels/commercial';
  const options = { headers: headers() };
  const body = {
    broadcaster_id: getChannelId(),
    length,
  };
  return axios.post(url, body, options);
}
