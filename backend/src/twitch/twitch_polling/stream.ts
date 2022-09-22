import dayjs from 'dayjs';
import { uptimeGracePeriod } from '../../config';
import { getChannelId } from '../../token';
import twitchApi from '../twitch_api';
import lastGames from './last_games';
import maxViewCount from './max_view_count';

interface Status {
  isOnline?: boolean;
  showsOnline?: boolean;
  timeStarted?: string | null;
  timeStopped?: string | null;
}

const status: Status = {
  isOnline: false,
  showsOnline: false,
  timeStarted: null,
  timeStopped: null,
};

export default async () => {
  const [stream] = await twitchApi.getStreams([getChannelId()]);
  uptime(stream);
  lastGames(stream).catch(() => {
    // Do Nothing
  });
  maxViewCount(stream).catch(() => {
    // Do Nothing
  });
};

function uptime(stream: TwitchStream | undefined): void {
  // lastPoll = stream;
  if (stream) {
    // Twitch sees channel as actively streaming
    status.showsOnline = true;

    if (status.isOnline) {
      status.timeStopped = null;
    } else {
      // Save that streamer is live
      status.isOnline = true;
      status.timeStarted = stream.started_at;
    }
  } else {
    // Twitch does not sees channel as actively streaming
    status.showsOnline = false;
    if (!status.isOnline) return;
    if (status.timeStopped) {
      if (dayjs() > dayjs(status.timeStopped).add(uptimeGracePeriod, 'minutes')) {
        // Enough time has past. Streamer likely has stopped streaming for the day.
        status.isOnline = false;
        status.timeStarted = null;
        status.timeStopped = null;
      }
    } else {
      // First stored stream drop
      status.timeStopped = new Date().toISOString();
    }
  }
}

export function getStatus(): Status {
  return status;
}
