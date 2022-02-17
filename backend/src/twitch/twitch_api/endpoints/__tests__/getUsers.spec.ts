import nock from 'nock';
import * as token from '../../../../token';
import twitchApi from '../../index';
import * as fixtures from '../__fixtures__/getUsers.fixture';

jest.spyOn(token, 'getKeys').mockImplementation(() => {
  return {
    access_token: 'foo',
    client_id: 'bar',
  };
});

describe('getUsers method', () => {
  it('returns an array of users', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/users')
      .query({ id: '51533859', login: 'dbkynd' })
      .reply(200, fixtures.usersMultiple);

    const actual = await twitchApi.getUsers(['51533859', 'dbkynd']);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(fixtures.usersMultiple.data);
    expect(actual[0].id).toBe('51533859');
    expect(actual[1].login).toBe('dbkynd');
  });

  it('return an emty array if no matches', async () => {
    nock('https://api.twitch.tv', {
      reqheaders: {
        authorization: 'Bearer foo',
        'client-id': 'bar',
      },
    })
      .get('/helix/users')
      .query({ id: '404', login: 'notfound' })
      .reply(200, { data: [] });

    const actual = await twitchApi.getUsers(['404', 'notfound']);
    expect(actual).toEqual([]);
  });
});
