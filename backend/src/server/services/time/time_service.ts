import { DateTime } from 'luxon';
import { timeFormat, timeTemplate, timeTz } from '../../../config';

export default (): string => {
  const time = DateTime.now().setZone(timeTz).toFormat(timeFormat);
  return timeTemplate.replace('<TIME>', time);
};
