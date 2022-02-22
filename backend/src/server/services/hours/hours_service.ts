import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ArchiveVideoService from '../../../database/lib/archived_videos';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

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
  const startOfQuarter = qMonths(dayjs().tz('America/Los_Angeles')).startOf(
    'month',
  );
  const endOfQuarter = dayjs(startOfQuarter).add(2, 'months').endOf('month');
  const startOfLastQuarter = dayjs(startOfQuarter)
    .subtract(3, 'months')
    .startOf('month');
  const endOfLastQuarter = dayjs(endOfQuarter)
    .subtract(3, 'months')
    .endOf('month');
  return {
    startOfLastQuarter,
    endOfLastQuarter,
    startOfQuarter,
    endOfQuarter,
  };
}

function qMonths(date: Dayjs): Dayjs {
  const month = date.month() + 1;
  if (month % 3 !== 0) {
    qMonths(date.subtract(1, 'month'));
  }
  return date;
}

async function getHours(start: Dayjs, end: Dayjs): Promise<number> {
  const videos = await ArchiveVideoService.getInRange(start, end);
  const sum = videos.reduce((prev, next) => {
    return prev + next.length;
  }, 0);
  const duration = dayjs.duration(sum, 'seconds');
  return Math.round(duration.asHours());
}
