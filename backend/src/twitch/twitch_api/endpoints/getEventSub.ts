import axios from '../axios';
import * as headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-eventsub-subscriptions

export default function getEventSub(): Promise<EventSub[]> {
  const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';
  const options = {
    headers: headers.appTokenHeaders(),
  };
  return axios.get(url, options).then(({ data }: { data: EventSub_Response }) => data.data);
}
