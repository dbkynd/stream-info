import seApi from '../../../streamelements/se_api';
import { getChannelName } from '../../../token';

const multiReg = /https?:\/\/(www\.)?multistre\.am\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export async function getMultiCommand(): Promise<SE_Command | undefined> {
  const commands = await seApi.getCommands();
  return commands.find((x) => x.command === 'multi');
}

export function transformReply(text: string): string | undefined {
  const match = text.match(multiReg) || [];
  if (!match.length) return;
  const channelRegExp = new RegExp(`${getChannelName()}\/?`);
  return match[0].toLowerCase().replace(channelRegExp, '').replace(/\/$/, '');
}
