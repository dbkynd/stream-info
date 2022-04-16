import { DateTime, Duration } from 'luxon';
import HostService from '../database/lib/host';
import logger from '../logger';
import * as io from '../server/socket.io';
import twitchCache from '../twitch/cache';
import twitchApi from '../twitch/twitch_api';

export default async (payload: HostPayload): Promise<void> => {
  if (payload.autohost) return;
  if (!payload.viewers || payload.viewers < 10) return;

  logger.debug('new host/raid');

  // Get userdata for the display name and id of the hostee / raider
  const [userData] = await twitchCache.getUsers([payload.username]);
  if (userData) {
    payload.displayName = userData.display_name;
    const [channelData] = await twitchApi.getChannels([userData.id]);
    if (channelData) payload.game = channelData.game_name;
    const videos = await twitchApi.getArchivedVideosByUser(userData.id);
    if (videos.length) {
      const now = DateTime.now();
      const lowerRange = Duration.fromObject({ minutes: 10 });
      const upperRange = Duration.fromObject({ minutes: 1 });
      const lowerBound = now.minus(lowerRange);
      const upperBound = now.plus(upperRange);

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const startTime = DateTime.fromISO(video.created_at);
        const videoLength = Duration.fromISO(`PT${video.duration.toUpperCase()}`);
        const endTime = startTime.plus(videoLength);
        if (endTime > lowerBound && endTime < upperBound) {
          payload.streamLength = videoLength.toFormat('hh:mm:ss');
          break;
        }
      }
    }
  }

  // if (payload.raid) {
  // raidMode.auto() // todo trigger raidmode
  // }

  // Emit to client regardless if successful database save
  const hostDoc = HostService.create(payload);
  io.emit('host', hostDoc);
  HostService.save(hostDoc).catch((err) => {
    logger.error(err);
  });
};
