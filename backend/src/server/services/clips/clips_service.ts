import ClipChannelService from '../../../database/lib/clip_channel';
import twitchApi from '../../../twitch/twitch_api';
import escapeHtml from 'escape-html';

export default async function (
  action?: string,
  target?: string,
): Promise<string> {
  if ((action !== 'add' && action !== 'remove') || !target) {
    return escapeHtml('!clips <add | remove> <target>');
  }
  const [user] = await twitchApi.getUsers([target]); // TODO: User cache
  if (!user) return 'Target channel not found.';
  if (action === 'add') await add(user);
  else await remove(user);
  return 'Clips update successful.';
}

async function add(user: HelixUser): Promise<void> {
  const exists = await ClipChannelService.has(user.id);
  if (exists) return;
  await ClipChannelService.add(user.id, user.display_name || user.login);
}

async function remove(user: HelixUser): Promise<void> {
  const exists = await ClipChannelService.has(user.id);
  if (!exists) return;
  await ClipChannelService.remove(user.id);
}
