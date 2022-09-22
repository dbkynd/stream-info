import MockDate from 'mockdate';
import mongoose from 'mongoose';
import HostService from '../../database/lib/raid';
import * as io from '../../server/socket.io';
import raidmode from '../../streamelements/raidmode';
import twitchCache from '../../twitch/cache';
import twitchApi from '../../twitch/twitch_api';
import raid from '../raid';
import * as fixtures from './__fixtures__/raid.fixtures';

jest.mock('../../logger');

jest.useFakeTimers();

jest.spyOn(twitchCache, 'getUsers').mockImplementation(() => {
  return Promise.resolve(fixtures.users.data);
});

jest.spyOn(twitchApi, 'getChannels').mockImplementation(() => {
  return Promise.resolve([]);
});

jest.spyOn(twitchApi, 'getArchivedVideosByUser').mockImplementation(() => {
  return Promise.resolve([]);
});

const saveSpy = jest.spyOn(HostService, 'save').mockImplementation(() => {
  return Promise.resolve();
});
const emitSpy = jest.spyOn(io, 'emit');
const raidmodeSpy = jest.spyOn(raidmode, 'auto').mockImplementation(() => {
  // Do Nothing
});

function test(expected: any) {
  expect(saveSpy).toHaveBeenCalled();
  expect(saveSpy.mock.calls[0][0].toJSON()).toEqual(expected);
  expect(emitSpy).toHaveBeenCalled();
  expect(emitSpy.mock.calls[0][0]).toBe('raid');
  expect(emitSpy.mock.calls[0][1].toJSON()).toEqual(expected);
}

describe('raid event', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('no additional data', () => {
    it('does nothing if less than 10 viewers', async () => {
      const payload = {
        username: 'mismagpie',
        viewers: 9,
      };

      await raid(payload);

      expect(saveSpy).not.toHaveBeenCalled();
    });

    it('saves and emits raid', async () => {
      const payload = {
        username: 'mismagpie',
        viewers: 100,
      };

      await raid(payload);

      const expected = {
        _id: expect.any(mongoose.Types.ObjectId),
        cleared: false,
        createdAt: expect.any(Date),
        payload: {
          username: 'mismagpie',
          viewers: 100,
          displayName: 'MisMagpie',
        },
      };

      test(expected);
      expect(raidmodeSpy).toHaveBeenCalled();
    });
  });

  describe('with game details', () => {
    beforeAll(() => {
      jest.spyOn(twitchApi, 'getChannels').mockImplementation(() => {
        return Promise.resolve(fixtures.channels.data);
      });
    });

    afterAll(() => {
      jest.spyOn(twitchApi, 'getChannels').mockImplementation(() => {
        return Promise.resolve([]);
      });
    });

    it('saves and emits raid', async () => {
      const payload = {
        username: 'mismagpie',
        viewers: 100,
      };

      await raid(payload);

      const expected = {
        _id: expect.any(mongoose.Types.ObjectId),
        cleared: false,
        createdAt: expect.any(Date),
        payload: {
          username: 'mismagpie',
          viewers: 100,
          displayName: 'MisMagpie',
          game: 'Escape from Tarkov',
        },
      };

      test(expected);
    });
  });

  describe('with stream length details', () => {
    // '2022-04-25T22:45:44Z' video created_at time
    // 1650926744000
    // '3h25m58s' video duration
    // 12358 seconds
    const endTime = 1650926744000 + 12358 * 1000; // Exact end time of video

    beforeAll(() => {
      jest.spyOn(twitchApi, 'getArchivedVideosByUser').mockImplementation(() => {
        return Promise.resolve(fixtures.archivedVideos.data);
      });
    });

    afterAll(() => {
      jest.spyOn(twitchApi, 'getArchivedVideosByUser').mockImplementation(() => {
        return Promise.resolve([]);
      });
    });

    it('adds stream length details if within time range', async () => {
      MockDate.set(endTime);

      const payload = {
        username: 'mismagpie',
        viewers: 100,
      };

      await raid(payload);

      const expected = {
        _id: expect.any(mongoose.Types.ObjectId),
        cleared: false,
        createdAt: expect.any(Date),
        payload: {
          username: 'mismagpie',
          viewers: 100,
          displayName: 'MisMagpie',
          streamLength: '03:25:58',
          title: "♡Chillin Killin'♡  !Coffee !Lazarus !Evasion !Socials",
        },
      };

      test(expected);
    });

    it('does not add stream length details if endtime is less than the lowerBound', async () => {
      MockDate.set(endTime + 1000 * 60 * 10 + 1);

      const payload = {
        username: 'mismagpie',
        viewers: 100,
      };

      await raid(payload);

      const expected = {
        _id: expect.any(mongoose.Types.ObjectId),
        cleared: false,
        createdAt: expect.any(Date),
        payload: {
          username: 'mismagpie',
          viewers: 100,
          displayName: 'MisMagpie',
        },
      };

      test(expected);
    });

    it('does not add stream length details if endtime is more than the upperBound', async () => {
      MockDate.set(endTime - 1000 * 60 * 10 - 1);

      const payload = {
        username: 'mismagpie',
        viewers: 100,
      };

      await raid(payload);

      const expected = {
        _id: expect.any(mongoose.Types.ObjectId),
        cleared: false,
        createdAt: expect.any(Date),
        payload: {
          username: 'mismagpie',
          viewers: 100,
          displayName: 'MisMagpie',
          // streamLength: '06:34:06',
        },
      };

      test(expected);
    });
  });
});
