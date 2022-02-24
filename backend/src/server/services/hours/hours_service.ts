import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment, { Moment } from 'moment-timezone';
import ArchiveVideoService from '../../../database/lib/archived_videos';

dayjs.extend(utc);
dayjs.extend(timezone);

export default async (): Promise<{
  thisQuarter: number;
  lastQuarter: number;
}> => {
  const { startOfQuarter, startOfLastQuarter, endOfQuarter, endOfLastQuarter } =
    determineTimeRage();
  return {
    thisQuarter: await getHours(startOfQuarter, endOfQuarter),
    lastQuarter: await getHours(startOfLastQuarter, endOfLastQuarter),
  };
};

export function determineTimeRage() {
  const now = moment().tz('America/Los_Angeles');
  const startOfQuarter = qMonths(now.startOf('month'));
  const endOfQuarter = moment(startOfQuarter).add(2, 'months').endOf('month');
  const startOfLastQuarter = moment(startOfQuarter)
    .subtract(3, 'months')
    .startOf('month');
  const endOfLastQuarter = moment(endOfQuarter)
    .subtract(3, 'months')
    .endOf('month');
  return {
    startOfLastQuarter,
    endOfLastQuarter,
    startOfQuarter,
    endOfQuarter,
  };
}

export function qMonths(date: any) {
  const month = date.month() + 1;
  let sub = 0;
  while ((month - sub) % 3 !== 0) {
    sub++;
  }
  return date.subtract(sub, 'month');
}

export async function getHours(start: Moment, end: Moment): Promise<number> {
  const videos = await ArchiveVideoService.getInRange(
    start.toISOString(),
    end.toISOString(),
  );
  const sum = videos.reduce((prev, next) => {
    return prev + next.length;
  }, 0);
  return Math.round(sum / 60 / 60);
}
