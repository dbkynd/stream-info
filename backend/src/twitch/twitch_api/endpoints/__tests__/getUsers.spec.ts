import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/getUsers.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getUsers method', () => {
  it('gets user by login', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/users')
      .query({ login: 'twitchdev' })
      .reply(200, fixtures.users);

    const actual = await twitchApi.getUsers(['twitchdev']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.users.data);
    expect(actual[0].login).toBe('twitchdev');
  });

  it('gets user by id', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/users')
      .query({ id: '141981764' })
      .reply(200, fixtures.users);

    const actual = await twitchApi.getUsers(['141981764']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.users.data);
    expect(actual[0].id).toBe('141981764');
  });
});
