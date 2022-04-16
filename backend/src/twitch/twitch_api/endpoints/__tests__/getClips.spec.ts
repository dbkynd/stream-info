import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/getClips.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getClips method', () => {
  it('gets clip by slug', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/clips')
      .query({ id: 'AwkwardHelplessSalamanderSwiftRage' })
      .reply(200, fixtures.clips);

    const actual = await twitchApi.getClips(['AwkwardHelplessSalamanderSwiftRage']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.clips.data);
    expect(actual[0].id).toBe('AwkwardHelplessSalamanderSwiftRage');
  });
});
