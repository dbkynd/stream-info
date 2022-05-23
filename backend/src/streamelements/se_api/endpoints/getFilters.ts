import axios from 'axios';
import { getChannelId } from '../../index';

// https://dev.streamelements.com/docs/kappa/b3A6NTM5NzExMw-channel

export default async function getFilters(): Promise<SEFiltersResponse> {
  const url = `https://api.streamelements.com/kappa/v2/bot/filters/${getChannelId()}`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
    },
  };
  return axios.get(url, options).then(({ data }: { data: SEFiltersResponse }) => data);
}
