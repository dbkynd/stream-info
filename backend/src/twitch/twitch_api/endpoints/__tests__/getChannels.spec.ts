import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/getChannels.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getChannels method', () => {
  it('gets channel by broadcaster_id', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/channels')
      .query({ broadcaster_id: '141981764' })
      .reply(200, fixtures.channels);

    const actual = await twitchApi.getChannels(['141981764']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.channels.data);
    expect(actual[0].broadcaster_login).toBe('twitchdev');
  });
});
