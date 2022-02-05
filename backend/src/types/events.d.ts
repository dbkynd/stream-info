interface CheerPayload {
  userstate: import('tmi').ChatUserstate;
  message: string;
}

interface HostPayload {
  username: string;
  viewers: number;
  autohost: boolean;
  raid: boolean;
  game?: string | undefined;
  displayName?: string;
}

interface TipPayload extends SE_WS_Data {
  tipId: string;
  providerId: 'twitch';
  displayName: string;
  currency: string;
}
