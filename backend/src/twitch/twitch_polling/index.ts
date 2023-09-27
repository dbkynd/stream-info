import hoursStreamed from './hours_streamed';
import * as liveSubs from './live_subs';
import stream from './stream';

let streamTimer: NodeJS.Timeout;
let hoursTimer: NodeJS.Timeout;

export function start() {
  stream();
  streamTimer = setInterval(stream, 1000 * 60);

  hoursTimer = setInterval(hoursStreamed, 1000 * 60 * 20);
  liveSubs.start();
}

export function stop() {
  if (streamTimer) clearInterval(streamTimer);
  if (hoursTimer) clearInterval(hoursTimer);
  liveSubs.stop();
}
