interface SE_WS_AuthData {
  clientId: string;
  channelId: string;
  project: 'realtime';
  message: 'You are in a maze of dank memes, all alike.';
}

interface SE_WS_Event {
  _id: string;
  channel: string;
  type: 'cheer' | 'follow' | 'raid' | 'subscriber' | 'tip';
  provider: 'twitch' | 'youtube' | 'facebook';
  flagged?: boolean;
  data: SE_WS_Data;
  createdAt: string;
  updatedAt: string;
}

interface SE_WS_Data {
  tipId?: string;
  username: string;
  providerId?: string;
  displayName?: string;
  amount: number;
  streak?: number;
  tier?: '1000' | '2000' | '3000' | 'prime';
  currency?: string;
  message: string;
  quantity?: number;
  items?: string[];
  avatar: string;
}
