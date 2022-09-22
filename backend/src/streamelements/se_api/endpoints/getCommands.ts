import axios from 'axios';
import { getChannelId } from '../../index';

// https://dev.streamelements.com/docs/kappa/b3A6NTM5NzA5OA-channel

export default async function getCommands(): Promise<SE_Command[]> {
  const url = `https://api.streamelements.com/kappa/v2/bot/commands/${getChannelId()}`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
    },
  };
  return axios.get(url, options).then(({ data }: { data: SE_Command[] }) => data);
}
