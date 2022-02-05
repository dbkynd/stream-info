import HostService from '../database/lib/host';
import logger from '../logger';
import * as io from '../server/socket.io';
import twitchApi from '../twitch/twitch_api';

export default async (payload: HostPayload): Promise<void> => {
  logger.debug('new host/raid');

  // Get userdata so we have the display name and id of the hostee / raider
  const [userData] = await twitchApi.getUsers([payload.username]);
  if (userData) payload.displayName = userData.display_name;

  if (payload.raid) {
    // raidMode.auto() // todo trigger raidmode
    if (userData) {
      const [channelData] = await twitchApi.getChannels([userData.id]);
      if (channelData) payload.game = channelData.game_name;
    }
  } else {
    if (payload.autohost) return;
    if (!payload.viewers || payload.viewers < 10) return;
  }

  // Emit to client regardless if successful database save
  const hostDoc = HostService.create(payload);
  io.emit('host', hostDoc);
  HostService.save(hostDoc).catch();
};
