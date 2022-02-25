import axios from '../axios';
import headers from '../headers';

// https://dev.twitch.tv/docs/api/reference#get-broadcaster-subscriptions

export default async function getSubscriptions(
  limit: number,
  cursor?: string,
): Promise<TwitchSubscriptionResponse> {
  const url = 'https://api.twitch.tv/helix/subscriptions';
  const options = {
    headers: headers(),
    params: {
      broadcaster_id: '51533859', // TODO
      first: limit,
      after: cursor,
    },
  };
  return axios
    .get(url, options)
    .then(({ data }: { data: TwitchSubscriptionResponse }) => data);
}
