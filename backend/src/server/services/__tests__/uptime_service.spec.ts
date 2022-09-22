import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { uptimeOffline } from '../../../config';
import * as stream from '../../../twitch/twitch_polling/stream';
import UptimeService from '../uptime/uptime_service';

MockDate.set('2021-01-01T00:00:00Z');

describe('uptime service module', () => {
  describe('offline response', () => {
    it('returns the offline response if showsOnline is false', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: false,
          timeStarted: new Date().toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe(uptimeOffline);
    });

    it('returns the offline response if timeStarted is null', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: null,
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe(uptimeOffline);
    });
  });

  describe('online response', () => {
    test('singular minutes', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(1, 'm').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 1 minute.');
    });

    test('plural minutes', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'm').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 minutes.');
    });

    test('singular hours', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(1, 'h').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 1 hour.');
    });

    test('plural hours', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'h').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 hours.');
    });

    test('singular days', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(1, 'd').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 1 day.');
    });

    test('plural days', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'd').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 days.');
    });

    test('hours and minutes uses an and separator', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'h').subtract(5, 'm').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 hours and 5 minutes.');
    });

    test('days and minutes uses an and separator', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'd').subtract(5, 'm').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 days and 5 minutes.');
    });

    test('days and hours uses an and separator', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'd').subtract(5, 'h').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 days and 5 hours.');
    });

    test('days hours and minutes uses comma and an and separator', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 'd').subtract(5, 'h').subtract(5, 'm').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 5 days, 5 hours and 5 minutes.');
    });

    test('under 1 minute response', () => {
      jest.spyOn(stream, 'getStatus').mockImplementation(() => {
        return {
          showsOnline: true,
          timeStarted: dayjs().subtract(5, 's').toISOString(),
        };
      });

      const uptime = UptimeService();
      expect(uptime).toBe('The stream has been live for 0 minutes.');
    });
  });
});
