export interface Emotes {
  [key: string]: Emote;
}

export interface Emote {
  static: string;
  animated?: string;
  source: 'twitch' | 'bttv' | 'ffz' | 'cheermote';
  tier?: string;
  value?: string;
}

interface TipPayload {
  tipId: string;
  username: string;
  amount: number;
  currency: string;
  message: string;
  avatar: string;
  created_at: string;
  emotes?: Emotes;
}

export interface Tip {
  _id: string;
  payload: TipPayload;
  cleared: boolean;
  createdAt: string;
}

interface CheerPayload {
  userstate: CheerUserState | HypeChatUserState;
  message: string;
  emotes: Emotes;
}

export interface Cheer {
  _id: string;
  payload: CheerPayload;
  cleared: boolean;
  createdAt: string;
}

export interface UserState {
  'display-name': string;
  login: string;
  'tmi-sent-ts': string;
  'msg-id':
    | 'primepaidupgrade'
    | 'subgift'
    | 'resub'
    | 'submysterygift'
    | 'sub'
    | 'giftpaidupgrade';
  'msg-param-months'?: string | boolean;
  'msg-param-mass-gift-count'?: string | boolean;
  'msg-param-cumulative-months'?: string | boolean;
  'msg-param-recipient-user-name'?: string;
  'msg-param-recipient-display-name'?: string;
  'msg-param-gift-months'?: string | boolean;
  'msg-param-sender-login'?: string;
  'msg-param-sender-name'?: string;
  'msg-param-sub-plan'?: string;
  'msg-param-multimonth-duration'?: string | boolean;
  'msg-param-multimonth-tenure'?: string | boolean;
  'msg-param-should-share-streak'?: boolean;
  'msg-param-streak-months'?: string | boolean;
  'msg-param-was-gifted'?: string;
}

export interface CheerUserState {
  bits: string;
  'display-name': string;
  'tmi-sent-ts': string;
  username: string;
  'msg-id'?: string;
}

export interface HypeChatUserState {
  'display-name': string;
  'pinned-chat-paid-amount': string;
  'pinned-chat-paid-canonical-amount': string;
  'pinned-chat-paid-currency': string;
  'pinned-chat-paid-exponent': string;
  'pinned-chat-paid-is-system-message': string;
  'pinned-chat-paid-level': string;
  'tmi-sent-ts': string;
}

interface RaidPayload {
  username: string;
  viewers: string;
  displayName: string;
  game?: string;
  streamLength?: string;
  title?: string;
}

export interface Raid {
  _id: string;
  payload: RaidPayload;
  cleared: boolean;
  createdAt: string;
}

interface SubPayload {
  userstate: UserState;
  message?: string;
  emotes?: Emotes;
}

export interface Sub {
  _id: string;
  payload: SubPayload;
  cleared: boolean;
  createdAt: string;
}

export type Event = Tip | Cheer | Raid | Sub;

export type Payload = TipPayload | CheerPayload | RaidPayload | SubPayload;

export type MessagePayload = TipPayload | CheerPayload | SubPayload;
