import * as MultiService from '../multi/multi_service';

describe('multi service module', () => {
  describe('transformReply method', () => {
    test('single url with text', () => {
      const actual = MultiService.transformReply(
        'Watch all the streams: https://multistre.am/AnneMunition/BazingaThatB/im_amethyst/MisMagpie',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });

    test('single url no text', () => {
      const actual = MultiService.transformReply(
        'https://multistre.am/AnneMunition/BazingaThatB/im_amethyst/MisMagpie',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });

    test('Anne in middle of url', () => {
      const actual = MultiService.transformReply(
        'Watch all the streams: https://multistre.am/AnneMunition/BazingaThatB/im_amethyst/MisMagpie',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });

    test('Anne at end of url', () => {
      const actual = MultiService.transformReply(
        'Watch all the streams: https://multistre.am/BazingaThatB/im_amethyst/MisMagpie/AnneMunition',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });

    test('Anne at end of url with trailing slash', () => {
      const actual = MultiService.transformReply(
        'Watch all the streams: https://multistre.am/BazingaThatB/im_amethyst/MisMagpie/AnneMunition/',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });

    test('with squad url', () => {
      const actual = MultiService.transformReply(
        'Watch all the streams: https://multistre.am/AnneMunition/BazingaThatB/im_amethyst/MisMagpie or https://www.twitch.tv/annemunition/squad',
      );
      expect(actual).toBe(
        'https://multistre.am/bazingathatb/im_amethyst/mismagpie',
      );
    });
  });
});
