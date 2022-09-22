import axios from '../axios';
import * as headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#create-eventsub-subscription

export default function createEventSub(body: EventSub_Sub): Promise<EventSub_Response> {
  const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';
  const options = {
    headers: headers.appTokenHeaders(),
  };
  return axios.post(url, body, options).then(({ data }: { data: EventSub_Response }) => data);
}
