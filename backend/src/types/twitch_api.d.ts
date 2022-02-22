interface TwitchUserResponse {
  data: TwitchUser[];
}

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email?: string;
  created_at: string;
}

interface TwitchToken {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: number;
}

interface TwitchChannelResponse {
  data: TwitchChannel[];
}

interface TwitchChannel {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  broadcaster_language: string;
  game_id: string;
  game_name: string;
  title: string;
  delay: number;
}

interface TwitchSubscriptionResponse {
  data: TwitchSubscription[];
  pagination: {
    cursor: string;
  };
  total: number;
  points: number;
}

interface TwitchSubscription {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  gifter_id: string;
  gifter_login: string;
  gifter_name: string;
  is_gift: false;
  plan_name: string;
  tier: '1000' | '2000' | '3000' | 'prime';
  user_id: string;
  user_name: string;
  user_login: string;
}

interface TwitchGameResponse {
  data: TwitchGame[];
}

interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
}

interface TwitchClipResponse {
  data: TwitchClip[];
}

interface TwitchClip {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
}

interface TwitchStreamResponse {
  data: TwitchStream[];
  pagination: {
    cursor: string;
  };
}

interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: 78365;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: false;
}
