import axios from 'axios';
import { getChannelId } from '../../index';

// https://dev.streamelements.com/docs/kappa/b3A6NTM5NzExNA-channel

export default async function putFilters(body: SEFiltersBody): Promise<void> {
  const url = `https://api.streamelements.com/kappa/v2/bot/filters/${getChannelId()}`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
    },
  };
  return axios.put(url, body, options);
}
