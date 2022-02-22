import hoursStreamed from './hours_streamed';
import stream from './stream';

let streamTimer: NodeJS.Timer;
let hoursTimer: NodeJS.Timer;

export function start() {
  stream();
  streamTimer = setInterval(stream, 1000 * 60);

  hoursTimer = setInterval(hoursStreamed, 1000 * 60 * 20);
}

export function stop() {
  if (streamTimer) clearInterval(streamTimer);
  if (hoursTimer) clearInterval(hoursTimer);
}
