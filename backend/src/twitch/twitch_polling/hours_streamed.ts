import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import ArchiveVideoService from '../../database/lib/archived_videos';
import { ArchiveVideoBulkUpdate } from '../../database/lib/archived_videos/archived_video_model';
import twitchApi from '../twitch_api';

dayjs.extend(duration);

export default async () => {
  const videos = await twitchApi.getArchivedVideosByUser('51533859'); // TODO
  const locked = await ArchiveVideoService.getLocked();
  const lockedIds = locked.map((x) => x.videoId);

  const operations: ArchiveVideoBulkUpdate[] = [];
  videos.forEach((video) => {
    if (lockedIds.includes(video.id.toString())) return;
    const seconds = dayjs
      .duration('PT' + video.duration.toUpperCase())
      .asSeconds();
    operations.push(ArchiveVideoService.createBulkOperation(video, seconds));
  });

  if (operations.length === 0) return;
  await ArchiveVideoService.bulkUpdate(operations);
};
