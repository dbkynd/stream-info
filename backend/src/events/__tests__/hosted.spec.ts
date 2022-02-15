import HostService from '../../database/lib/host';
import * as io from '../../server/socket.io';
import twitchApi from '../../twitch/twitch_api';
import getChannels from '../../twitch/twitch_api/__stubs__/getChannels';
import getUsers from '../../twitch/twitch_api/__stubs__/getUsers';
import hosted from '../hosted';

jest.useFakeTimers();

jest.spyOn(twitchApi, 'getUsers').mockImplementation(() => {
  return Promise.resolve(getUsers.data);
});

jest.spyOn(twitchApi, 'getChannels').mockImplementation(() => {
  return Promise.resolve(getChannels.data);
});

const saveSpy = jest.spyOn(HostService, 'save');
const emitSpy = jest.spyOn(io, 'emit');

describe('hosted event', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('saves and emits host', async () => {
    const payload = {
      username: 'annemunition',
      viewers: 100,
      autohost: false,
      raid: false,
    };

    await hosted(payload);

    const expected = {
      _id: expect.anything(),
      cleared: false,
      createdAt: expect.anything(),
      payload: {
        username: 'annemunition',
        viewers: 100,
        autohost: false,
        raid: false,
        game: "Tom Clancy's Rainbow Six Siege",
        displayName: 'AnneMunition',
      },
    };

    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy.mock.calls[0][0].toJSON()).toEqual(expected);
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy.mock.calls[0][0]).toBe('host');
    expect(emitSpy.mock.calls[0][1].toJSON()).toEqual(expected);
  });

  it('does nothing if autohost', async () => {
    const payload = {
      username: 'annemunition',
      viewers: 100,
      autohost: true,
      raid: false,
    };

    await hosted(payload);

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('does nothing if less than 10 viewers', async () => {
    const payload = {
      username: 'annemunition',
      viewers: 9,
      autohost: false,
      raid: false,
    };

    await hosted(payload);

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('saves and emits raid', async () => {
    const payload = {
      username: 'annemunition',
      viewers: 100,
      autohost: false,
      raid: true,
    };

    await hosted(payload);

    const expected = {
      _id: expect.anything(),
      cleared: false,
      createdAt: expect.anything(),
      payload: {
        username: 'annemunition',
        viewers: 100,
        autohost: false,
        raid: true,
        game: "Tom Clancy's Rainbow Six Siege",
        displayName: 'AnneMunition',
      },
    };

    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy.mock.calls[0][0].toJSON()).toEqual(expected);
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy.mock.calls[0][0]).toBe('host');
    expect(emitSpy.mock.calls[0][1].toJSON()).toEqual(expected);
  });
});
