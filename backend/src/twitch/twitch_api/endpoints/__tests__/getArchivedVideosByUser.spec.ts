import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/getArchivedVideosByUser.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getArchivedVideosByUser method', () => {
  it('gets archived videos by user_id', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/videos')
      .query({
        user_id: '141981764',
        first: 10,
        type: 'archive',
      })
      .reply(200, fixtures.archivedVideosByUser);

    const actual = await twitchApi.getArchivedVideosByUser('141981764');
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.archivedVideosByUser.data);
    expect(actual[0].user_id).toBe('141981764');
  });
});
