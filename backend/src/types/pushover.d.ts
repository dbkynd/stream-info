interface Options {
  user: string;
  token: string;
  onerror(err: Error): void;
}

interface Message {
  message: string;
  title?: string;
  device?: string;
  html?: '1';
  timestamp?: number;
  priority?: '-2' | '-1' | '0' | '1' | '2';
  url?: string;
  url_title?: string;
  sound?: Sounds;
  file?: { name: string; data: Buffer };
}

type Sounds =
  | 'pushover'
  | 'bike'
  | 'bugle'
  | 'cashregister'
  | 'classical'
  | 'cosmic'
  | 'falling'
  | 'gamelan'
  | 'incoming'
  | 'intermission'
  | 'magic'
  | 'mechanical'
  | 'pianobar'
  | 'siren'
  | 'spacealarm'
  | 'tugboat'
  | 'alien'
  | 'climb'
  | 'persistent'
  | 'echo'
  | 'updown'
  | 'vibrate'
  | 'none';

declare class Pushover {
  constructor(options?: Options);
  send(message: Message, cb: (err: Error) => void): void;
}

declare module 'pushover-notifications' {
  export = Pushover;
}
