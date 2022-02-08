import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { timeFormat, timeTemplate, timeTz } from '../../../config';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export default (): string => {
  const time = dayjs().tz(timeTz).format(timeFormat);
  return timeTemplate.replace('<TIME>', time);
};
