import { DateTime, Duration } from 'luxon';
import ArchiveVideoService from '../../../database/lib/archived_videos';

export default async (): Promise<{
  thisMonth: number;
  lastMonth: number;
}> => {
  const now = DateTime.now().setZone('America/Los_Angeles');
  const startOfMonth = now.startOf('month');
  const endOfMonth = now.endOf('month');
  const startOfLastMonth = startOfMonth.minus(Duration.fromObject({ months: 1 }));

  return {
    thisMonth: await getHours(startOfMonth, endOfMonth),
    lastMonth: await getHours(startOfLastMonth, startOfMonth),
  };
};

export async function getHours(start: DateTime, end: DateTime): Promise<number> {
  const videos = await ArchiveVideoService.getInRange(start.toISO() as string, end.toISO() as string);
  const sum = videos.reduce((prev, next) => {
    return prev + next.length;
  }, 0);
  return Math.round(sum / 60 / 60);
}
