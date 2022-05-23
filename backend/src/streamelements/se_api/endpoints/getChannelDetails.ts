import axios from 'axios';

// https://dev.streamelements.com/docs/kappa/b3A6NTM5NzEzMQ-me

export default async function getChannelDetails(): Promise<SEChannelDetails> {
  const url = 'https://api.streamelements.com/kappa/v2/channels/me';
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
    },
  };
  return axios.get(url, options).then(({ data }: { data: SEChannelDetails }) => data);
}
