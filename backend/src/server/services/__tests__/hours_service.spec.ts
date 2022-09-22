import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import MockDate from 'mockdate';
import moment from 'moment-timezone';
import ArchiveVideoService from '../../../database/lib/archived_videos';
import { ArchiveVideoDoc } from '../../../database/lib/archived_videos/archived_video_model';
import { determineTimeRage, getHours, qMonths } from '../hours/hours_service';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('hoursStreamed module', () => {
  describe('determineTimeRage method', () => {
    const dates = {
      startOfLastQ4: moment.tz('2019-09-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfLastQ4: moment.tz('2019-11-30 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
      startOfQ1: moment.tz('2019-12-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      middleOfQ1: moment.tz('2020-01-15 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfQ1: moment.tz('2020-02-29 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
      startOfQ2: moment.tz('2020-03-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      middleOfQ2: moment.tz('2020-04-15 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfQ2: moment.tz('2020-05-31 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
      startOfQ3: moment.tz('2020-06-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      middleOfQ3: moment.tz('2020-07-15 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfQ3: moment.tz('2020-08-31 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
      startOfQ4: moment.tz('2020-09-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      middleOfQ4: moment.tz('2020-10-15 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfQ4: moment.tz('2020-11-30 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
      startOfNextQ1: moment.tz('2020-12-01 00:00:00', 'America/Los_Angeles').toLocaleString(),
      middleOfNextQ1: moment.tz('2021-01-15 00:00:00', 'America/Los_Angeles').toLocaleString(),
      endOfNextQ1: moment.tz('2021-02-28 23:59:59.999', 'America/Los_Angeles').toLocaleString(),
    };

    test('dates matches snapshot', () => {
      expect(dates).toMatchSnapshot();
    });

    testThing(
      'Q1',
      [dates.startOfQ1, dates.middleOfQ1, dates.endOfQ1],
      [dates.startOfLastQ4, dates.endOfLastQ4, dates.startOfQ1, dates.endOfQ1],
    );

    testThing(
      'Q2',
      [dates.startOfQ2, dates.middleOfQ2, dates.endOfQ2],
      [dates.startOfQ1, dates.endOfQ1, dates.startOfQ2, dates.endOfQ2],
    );

    testThing(
      'Q3',
      [dates.startOfQ3, dates.middleOfQ3, dates.endOfQ3],
      [dates.startOfQ2, dates.endOfQ2, dates.startOfQ3, dates.endOfQ3],
    );

    testThing(
      'Q4',
      [dates.startOfQ4, dates.middleOfQ4, dates.endOfQ4],
      [dates.startOfQ3, dates.endOfQ3, dates.startOfQ4, dates.endOfQ4],
    );

    testThing(
      'Next Q1',
      [dates.startOfNextQ1, dates.middleOfNextQ1, dates.endOfNextQ1],
      [dates.startOfQ4, dates.endOfQ4, dates.startOfNextQ1, dates.endOfNextQ1],
    );
  });

  function testThing(name: string, array: string[], expectedArray: string[]) {
    describe(name, () => {
      test.each(array)('%s', (date) => {
        MockDate.set(date);
        const { startOfLastQuarter, endOfLastQuarter, startOfQuarter, endOfQuarter } =
          determineTimeRage();
        expect(startOfLastQuarter.toLocaleString()).toBe(expectedArray[0]);
        expect(endOfLastQuarter.toLocaleString()).toBe(expectedArray[1]);
        expect(startOfQuarter.toLocaleString()).toBe(expectedArray[2]);
        expect(endOfQuarter.toLocaleString()).toBe(expectedArray[3]);
      });
    });
  }

  describe('getHours method', () => {
    it('returns a rounded number of hours', async () => {
      const mongoSpy = jest.spyOn(ArchiveVideoService, 'getInRange').mockImplementation(() => {
        return Promise.resolve([
          {
            length: 18000, // 5 hours
          },
          {
            length: 10800, // 3 hours
          },
          {
            length: 9360, // 2.6 Hours
          },
        ] as ArchiveVideoDoc[]);
      });
      const hours = await getHours(
        moment('2020-01-01T00:00:00.000Z'),
        moment('2020-01-10T00:00:00.000Z'),
      );

      expect(mongoSpy).toHaveBeenCalledWith('2020-01-01T00:00:00.000Z', '2020-01-10T00:00:00.000Z');
      expect(hours).toBe(11);
    });
  });

  describe('qMonths method', () => {
    test('December', () => {
      const actual = qMonths(dayjs('2019-12-01'));
      expect(actual.month() + 1).toBe(12);
    });

    test('January', () => {
      const actual = qMonths(dayjs('2020-01-01'));
      expect(actual.month() + 1).toBe(12);
    });

    test('February', () => {
      const actual = qMonths(dayjs('2020-02-01'));
      expect(actual.month() + 1).toBe(12);
    });

    test('March', () => {
      const actual = qMonths(dayjs('2020-03-01'));
      expect(actual.month() + 1).toBe(3);
    });

    test('April', () => {
      const actual = qMonths(dayjs('2020-04-01'));
      expect(actual.month() + 1).toBe(3);
    });

    test('May', () => {
      const actual = qMonths(dayjs('2020-05-01'));
      expect(actual.month() + 1).toBe(3);
    });

    test('June', () => {
      const actual = qMonths(dayjs('2020-06-01'));
      expect(actual.month() + 1).toBe(6);
    });

    test('July', () => {
      const actual = qMonths(dayjs('2020-07-01'));
      expect(actual.month() + 1).toBe(6);
    });

    test('August', () => {
      const actual = qMonths(dayjs('2020-08-01'));
      expect(actual.month() + 1).toBe(6);
    });

    test('September', () => {
      const actual = qMonths(dayjs('2020-09-01'));
      expect(actual.month() + 1).toBe(9);
    });

    test('October', () => {
      const actual = qMonths(dayjs('2020-10-01'));
      expect(actual.month() + 1).toBe(9);
    });

    test('November', () => {
      const actual = qMonths(dayjs('2020-11-01'));
      expect(actual.month() + 1).toBe(9);
    });
  });
});
