type MyEmotes = {
  [key: string]: {
    static: string;
    animated?: string;
    source: 'ffz' | 'bttv' | 'twitch' | 'cheermote';
  };
};

type ParsedEmotes = {
  [key: string]: {
    static: string;
    animated?: string;
    source: 'ffz' | 'bttv' | 'twitch' | 'cheermote';
  };
};

type BTTVGlobalEmotes = BTTVEmote[];

interface BTTVEmote {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}

interface BTTVSharedEmote {
  id: string;
  code: string;
  imageType: 'png' | 'gif';
  user: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
}

interface BTTVChannelEmotes {
  id: string;
  bots: [];
  avatar: string;
  channelEmotes: BTTVEmote[];
  sharedEmotes: BTTVSharedEmote[];
}

interface FFZRoomInfo {
  room: {
    _id: number;
    twitch_id: number;
    youtube_id: null;
    id: string;
    is_group: false;
    display_name: string;
    set: number;
    moderator_badge: null;
    vip_badge: null;
    mod_urls: null;
    // user_badges: {};
    // user_badge_ids: {};
    css: null;
  };
  sets: {
    [key: string]: FFZEmoteSet;
  };
}

interface FFZEmoteSet {
  id: number;
  _type: number;
  icon: null;
  title: string;
  css: null;
  emoticons: FFZEmote[];
}

interface FFZEmote {
  id: number;
  name: string;
  height: number;
  width: number;
  public: boolean;
  hidden: boolean;
  modifier: boolean;
  offset: null;
  margins: null;
  css: null;
  owner: {
    _id: number;
    name: string;
    display_name: string;
  };
  urls: {
    '1': string;
    '2'?: string;
    '4'?: string;
  };
  status: number;
  usage_count: number;
  created_at: string;
  last_updated: string;
}
