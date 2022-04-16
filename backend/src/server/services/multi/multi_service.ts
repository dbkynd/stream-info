import axios from 'axios';
import { getChannelId } from '../../../streamelements/se_socket';

const multiReg = /https?:\/\/(www\.)?multistre\.am\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export async function getMultiCommand(): Promise<SE_Command | undefined> {
  const { data }: { data: SE_Command[] } = await axios.get(
    `https://api.streamelements.com/kappa/v2/bot/commands/${getChannelId()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STREAMELEMENTS_JWT}`,
      },
    },
  );
  return data.find((x) => x.command === 'multi');
}

export function transformReply(text: string): string | undefined {
  const match = text.match(multiReg) || [];
  if (!match.length) return;
  return match[0]
    .toLowerCase()
    .replace(/annemunition\/?/, '')
    .replace(/\/$/, '');
}
