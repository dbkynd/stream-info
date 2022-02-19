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
      .query({ login: 'dbkynd' })
      .reply(200, fixtures.users);

    const actual = await twitchApi.getUsers(['dbkynd']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.users.data);
    expect(actual[0].login).toBe('dbkynd');
  });

  it('gets user by id', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/users')
      .query({ id: '59351240' })
      .reply(200, fixtures.users);

    const actual = await twitchApi.getUsers(['59351240']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.users.data);
    expect(actual[0].id).toBe('59351240');
  });
});
