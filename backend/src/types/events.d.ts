interface CheerPayload {
  userstate: import('tmi').ChatUserstate;
  message: string;
  emotes?: ParsedEmotes;
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
  emotes?: ParsedEmotes;
}

type SubUserstates =
  | import('tmi').SubUserstate
  | import('tmi').SubGiftUserstate
  | import('tmi').SubMysteryGiftUserstate;

interface SubscriptionPayload {
  userstate: SubUserstates;
  message?: string;
  recipients?: import('tmi').SubGiftUserstate[];
  emotes?: ParsedEmotes;
}
