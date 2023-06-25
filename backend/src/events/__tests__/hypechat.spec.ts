import CheerService from '../../database/lib/cheer/cheer_service';
import cheer from '../cheer';
import fixture from './__fixtures__/hypechat.fixture';

jest.mock('../../logger');
jest.mock('../../server/socket.io');

describe('hypechat', () => {
  test('creates correct database document', () => {
    let actual;
    const spy = jest.spyOn(CheerService, 'save').mockImplementation((obj) => {
      actual = obj;
      return Promise.resolve();
    });
    cheer.hypechat(fixture);
    expect(spy).toHaveBeenCalled();
    expect(actual).toMatchObject({
      _id: expect.anything(),
      cleared: false,
      createdAt: expect.anything(),
      payload: {
        userstate: fixture.tags,
        message: 'Another one! anneCozy',
        emotes: {
          anneCozy: {
            static: `https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_1aa223692f12479ba1081f43b6644a7b/static/dark/1.0`,
            animated: `https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_1aa223692f12479ba1081f43b6644a7b/default/dark/1.0`,
            source: 'twitch',
          },
        },
      },
    });
  });
});
