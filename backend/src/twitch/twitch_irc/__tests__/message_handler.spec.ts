import * as clipsHandler from '../clips_handler';
import messageHandler from '../message_handler';
import * as fixtures from './__fixture__/messages.fixture';

const clipsSpy = jest.spyOn(clipsHandler, 'default');
jest.mock('../../../token', () => {
  return {
    getChannelId: () => '51533859',
    getChannelName: () => 'annemunition',
    getKeys: () => {
      return { access_token: 'someToken' };
    },
  };
});

describe('message_handler method', () => {
  describe('clipsHandler', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('gets passed to the clips handler', () => {
      const clone = Object.assign({}, fixtures.asBroadcaster.userstate);

      messageHandler(clone, fixtures.asBroadcaster.message);

      expect(clipsSpy).toHaveBeenCalled();
      expect(clipsSpy).toHaveBeenLastCalledWith(clone, fixtures.asBroadcaster.message);
    });

    it('does nothing if message was a whisper', () => {
      const clone = Object.assign({}, fixtures.asBroadcaster.userstate);
      clone['message-type'] = 'whisper';

      messageHandler(clone, fixtures.asBroadcaster.message);

      expect(clipsSpy).not.toHaveBeenCalled();
    });
  });
});
