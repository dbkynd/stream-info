import axios from 'axios';
import { getChannelId } from '../../index';

// https://dev.streamelements.com/docs/kappa/b3A6NTM5NzEyNQ-channel-say

export default async function postChannelSay(message: string): Promise<void> {
  const url = `https://api.streamelements.com/kappa/v2/bot/${getChannelId()}/say`;
  const body = { message };
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
    },
  };
  return axios.post(url, body, options);
}
