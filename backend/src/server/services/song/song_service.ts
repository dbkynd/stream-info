import axios from 'axios';
import { songNotPlaying, songTemplate } from '../../../config';

export default async (user: string): Promise<string> => {
  if (!process.env.LASTFM_API_KEY) {
    return 'LastFM API Key not set.';
  }

  const url = 'https://ws.audioscrobbler.com/2.0';
  const options = {
    params: {
      method: 'user.getrecenttracks',
      limit: 1,
      user,
      api_key: process.env.LASTFM_API_KEY,
      format: 'json',
    },
  };

  try {
    const { data }: { data: LastFmResponse } = await axios.get(url, options);
    const recentTrack = data.recenttracks?.track?.[0];
    if (!recentTrack) return 'No recent tracks found.';
    if (recentTrack['@attr']?.nowplaying !== 'true') return songNotPlaying;
    const track = recentTrack.name || 'Track';
    const artist = recentTrack.artist['#text'] || 'Artist';
    return songTemplate.replace('<TRACK>', track).replace('<ARTIST>', artist);
  } catch (e) {
    return 'LastFM Error';
  }
};
