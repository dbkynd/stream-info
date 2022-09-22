interface SEChannelDetails {
  profile: {
    headerImage: string;
    language: string;
  };
  provider: string;
  suspended: boolean;
  nullChannel: boolean;
  providerEmails: string[];
  lastJWTToken: string | null;
  _id: string;
  email: string;
  avatar: string;
  verified: boolean;
  username: string;
  alias: string;
  displayName: string;
  providerId: string;
  accessToken: string;
  apiToken: string;
  isPartner: boolean;
  broadcasterType: string;
  users: SEUsers[];
  ab: any;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  country: string;
  providerTotals: {
    'follower-total': number;
  };
  type: string;
  inactive: boolean;
  features: {
    'g2a.countries': string;
    sepayCountries: string;
    paypalMicroCurrencies: string;
    paypalMicroCountries: string;
    zendeskFollowersMin: string;
    zendeskActive: string;
    'donatepay.countries': string;
    'zd.show': string;
    'donatepay.providers': string;
    disableMerch: string;
    merchBlocklist: string;
    showChristmas: string;
    'heartbeat.sampleRate': string;
  };
  geo: string;
}

interface SEUsers {
  user: string;
  providerId?: string;
  role: string;
  _id?: string;
}

interface SEFiltersResponse {
  activitySettings: {
    enabled: boolean;
    enableDefaultPhrases: boolean;
    enableCustomPhrases: boolean;
    mode: number;
    replaceWords: string[];
  };
  botFilters: {
    caps: {
      timeout: SETimeout;
      settings: {
        limit: number;
        min: number;
        percent: number;
      };
      enabled: boolean;
      exclude: number;
    };
    links: {
      timeout: SETimeout;
      enabled: boolean;
      exclude: number;
      whitelist: string[];
      blacklist: string[];
    };
    banphrases: {
      enabled: boolean;
    };
    emotes: {
      timeout: SETimeout;
      settings: {
        limit: number;
      };
      enabled: boolean;
      exclude: number;
    };
    symbols: {
      timeout: SETimeout;
      settings: {
        limit: number;
        min: number;
        percent: number;
      };
      enabled: boolean;
      exclude: number;
    };
    paragraph: {
      timeout: SETimeout;
      settings: {
        limit: number;
      };
      enabled: boolean;
      exclude: number;
    };
  };
  banphrases: SEBanPhrase[];
  _id: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
}

interface SETimeout {
  length: number;
  message: string;
}

interface SEBanPhrase {
  public: boolean;
  excludeLevel: number;
  enabled: boolean;
  appliesTo: string[];
  runsOn: string[];
  _id: string;
  name: string;
  timeoutLength: number;
  phrases: [
    {
      type: string;
      _id: string;
      phrase: string;
    },
  ];
  channel: string;
  lastUpdatedBy: {
    _id: string;
    displayName: string;
    username: string;
    avatar: string;
    inactive: boolean;
    isPartner: boolean;
  };
  createdAt: string;
  updatedAt: string;
  banReason: string;
}

interface SEFiltersBody extends SEFiltersBody {
  banphrases: string[];
}

interface SE_Command {
  cooldown: {
    user: number;
    global: number;
  };
  aliases: string[];
  keywords: string[];
  enabled: boolean;
  enabledOnline: boolean;
  enabledOffline: boolean;
  hidden: boolean;
  cost: number;
  type: string;
  accessLevel: number;
  _id: string;
  channel: string;
  command: string;
  reply: string;
  createdAt: string;
  updatedAt: string;
}
