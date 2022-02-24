import ArchiveVideo, {
  ArchiveVideoBulkUpdate,
  ArchiveVideoDoc,
} from './archived_video_model';

async function getLocked(): Promise<ArchiveVideoDoc[]> {
  return ArchiveVideo.find({ locked: true });
}

function createBulkOperation(
  video: TwitchVideo,
  duration: number,
): ArchiveVideoBulkUpdate {
  return {
    updateOne: {
      filter: { videoId: video.id },
      update: {
        videoId: video.id,
        createdAt: video.created_at,
        length: duration,
      },
      upsert: true,
    },
  };
}

async function bulkUpdate(ops: ArchiveVideoBulkUpdate[]): Promise<void> {
  await ArchiveVideo.bulkWrite(ops);
}

async function getInRange(
  start: string,
  end: string,
): Promise<ArchiveVideoDoc[]> {
  return ArchiveVideo.find({
    createdAt: { $gte: start, $lte: end },
  });
}

export default {
  getLocked,
  createBulkOperation,
  bulkUpdate,
  getInRange,
};
