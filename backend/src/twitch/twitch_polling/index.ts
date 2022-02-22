import stream from './stream';

let streamTimer: NodeJS.Timer;

export function start() {
  stream();
  streamTimer = setInterval(stream, 1000 * 60);
}

export function stop() {
  if (streamTimer) clearInterval(streamTimer);
}
