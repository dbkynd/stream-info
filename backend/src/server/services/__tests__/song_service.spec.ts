import nock from 'nock';
import { songNotPlaying } from '../../../config';
import SongService from '../song/song_service';
import * as songServiceFixtures from './__fixtures__/song_service.fixture';

describe('song service module', () => {
  beforeEach(() => {
    process.env.LASTFM_API_KEY = 'foobar';
  });

  test('no LASTFM_API_KEY set', async () => {
    delete process.env.LASTFM_API_KEY;
    const song = await SongService('someUser');
    expect(song).toBe('LastFM API Key not set.');
  });

  test('LASTFM 500 status', async () => {
    nock('https://ws.audioscrobbler.com').get('/2.0').query(true).reply(500);

    const song = await SongService('someUser');
    expect(song).toBe('LastFM Error');
  });

  test('no tracks found', async () => {
    nock('https://ws.audioscrobbler.com')
      .get('/2.0')
      .query({
        method: 'user.getrecenttracks',
        limit: 1,
        user: 'someUser',
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      })
      .reply(200, {});

    const song = await SongService('someUser');
    expect(song).toBe('No recent tracks found.');
  });

  test('no now playing track found', async () => {
    nock('https://ws.audioscrobbler.com')
      .get('/2.0')
      .query({
        method: 'user.getrecenttracks',
        limit: 1,
        user: 'someUser',
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      })
      .reply(200, songServiceFixtures.noSongPlaying);

    const song = await SongService('someUser');
    expect(song).toBe(songNotPlaying);
  });

  test('now playing track found', async () => {
    nock('https://ws.audioscrobbler.com')
      .get('/2.0')
      .query({
        method: 'user.getrecenttracks',
        limit: 1,
        user: 'someUser',
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      })
      .reply(200, songServiceFixtures.songPlaying);

    const song = await SongService('someUser');
    expect(song).toBe('Stan by Eminem');
  });

  test('now playing track found but missing track and artist', async () => {
    const songData = Object.assign({}, songServiceFixtures.songPlaying);
    songData.recenttracks.track[0].name = '';
    songData.recenttracks.track[0].artist['#text'] = '';

    nock('https://ws.audioscrobbler.com')
      .get('/2.0')
      .query({
        method: 'user.getrecenttracks',
        limit: 1,
        user: 'someUser',
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      })
      .reply(200, songData);

    const song = await SongService('someUser');
    expect(song).toBe('Track by Artist');
  });
});
