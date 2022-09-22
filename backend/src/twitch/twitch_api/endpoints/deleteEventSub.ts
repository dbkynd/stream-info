import axios from '../axios';
import * as headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#delete-eventsub-subscription

export default function deleteEventSub(id: string): Promise<void> {
  const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';
  const options = {
    headers: headers.appTokenHeaders(),
    params: {
      id,
    },
  };
  return axios.delete(url, options);
}
