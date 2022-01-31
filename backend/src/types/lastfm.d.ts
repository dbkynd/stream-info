interface Image {
  size: string;
  '#text': string;
}

interface Track {
  artist: {
    mbid: string;
    '#text': string;
  };
  '@attr'?: {
    nowplaying?: string;
  };
  mbid: string;
  album: {
    mbid: string;
    '#text': string;
  };
  streamable: string;
  url: string;
  name: string;
  image: Image[];
  date?: {
    uts: string;
    '#text': string;
  };
}

interface LastFmResponse {
  recenttracks: {
    '@attr': {
      page: string;
      total: string;
      user: string;
      perPage: string;
      totalPages: string;
    };
    track: Track[];
  };
}
