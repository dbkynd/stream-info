import _ from 'lodash';
import { uptimeOffline, uptimeTemplate } from '../../../config';
// import * as store from '../../../store';

const timeStarted = Date.now();

export default (): string => {
  // const { consideredOnline, timeStarted } = store.get('streamStatus', {});
  // if (!consideredOnline || !timeStarted) return uptimeOffline;
  // TODO: Use Store

  const duration = Date.now() - new Date(timeStarted).valueOf();

  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor(duration / (1000 * 60));

  const daysString = `${days} day${s(days)}`;
  const hoursString = `${hours} hour${s(hours)}`;
  const minutesString = `${minutes} minute${s(minutes)}`;

  const time = _.compact([
    days ? daysString : null,
    hours ? hoursString : null,
    minutes ? minutesString : null,
  ]);

  if (time.length === 3) {
    time.splice(1, 0, ', ');
    time.splice(3, 0, ' and ');
  } else if (time.length === 2) {
    time.splice(1, 0, ' and ');
  } else if (time.length === 0) {
    time[0] = '0 minutes';
  }

  return uptimeTemplate.replace('<UPTIME>', time.join(''));
};

function s(num: number): string {
  return num === 1 ? '' : 's';
}
