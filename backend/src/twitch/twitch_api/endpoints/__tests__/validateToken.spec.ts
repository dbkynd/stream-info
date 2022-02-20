import nock from 'nock';
import twitchApi from '../../index';
import * as fixtures from './__fixtures__/validateToken.fixture';

describe('validateToken method', () => {
  it('gets the token data', async () => {
    nock('https://id.twitch.tv', {
      reqheaders: {
        authorization: 'OAuth foobar',
      },
    })
      .get('/oauth2/validate')
      .reply(200, fixtures.token);

    const actual = await twitchApi.validateToken('foobar');
    expect(actual).toEqual(fixtures.token);
    expect(actual.client_id).toBe('0000');
  });
});
