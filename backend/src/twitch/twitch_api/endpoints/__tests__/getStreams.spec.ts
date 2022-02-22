import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/getStreams.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getStreams method', () => {
  it('gets stream by login', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/streams')
      .query({ user_login: 'auronplay' })
      .reply(200, fixtures.streams);

    const actual = await twitchApi.getStreams(['auronplay']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.streams.data);
    expect(actual[0].user_login).toBe('auronplay');
  });

  it('gets stream by id', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/streams')
      .query({ user_id: '459331509' })
      .reply(200, fixtures.streams);

    const actual = await twitchApi.getStreams(['459331509']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.streams.data);
    expect(actual[0].user_id).toBe('459331509');
  });
});
