/* eslint-disable @typescript-eslint/ban-ts-comment */

import events from '../../../events';
import logger from '../../../logger';
import * as twitchIrc from '../index';
import * as messageHandler from '../message_handler';

jest.mock('tmi.js');
jest.mock('../../../logger');
jest.mock('../../../events');
jest.mock('../../../token', () => {
  return {
    getChannelId: () => '51533859',
    getChannelName: () => 'annemunition',
    getKeys: () => {
      return { access_token: 'someToken' };
    },
  };
});

const client = twitchIrc.getClient();

describe('twitch_irc module', () => {
  describe('connect method', () => {
    it('calls client.connect', async () => {
      await twitchIrc.connect();
      expect(client.connect).toHaveBeenCalled();
    });
  });

  describe('disconnect method', () => {
    it('calls client.disconnect', async () => {
      await twitchIrc.disconnect();
      expect(client.disconnect).toHaveBeenCalled();
    });
  });

  describe('connected event', () => {
    it('listens to the connected event', async () => {
      expect(client.on).toHaveBeenCalledWith('connected', expect.any(Function));
    });

    it('updates the appState', async () => {
      const spy = jest.spyOn(events.state, 'updateAppState');
      // @ts-ignore
      client.emit('connected');
      expect(spy).toHaveBeenCalledWith({ twitchIrc: true });
    });
  });

  describe('disconnected event', () => {
    it('listens to the disconnected event', async () => {
      expect(client.on).toHaveBeenCalledWith('disconnected', expect.any(Function));
    });

    it('updates the appState', async () => {
      const spy = jest.spyOn(events.state, 'updateAppState');
      // @ts-ignore
      client.emit('disconnected');
      expect(spy).toHaveBeenCalledWith({ twitchIrc: false });
    });
  });

  describe('cheer event', () => {
    it('listens to the cheer event', async () => {
      expect(client.on).toHaveBeenCalledWith('cheer', expect.any(Function));
    });

    it('passes the cheer to our events handler', () => {
      const spy = jest.spyOn(events, 'cheer');
      // @ts-ignore
      client.emit('cheer', 'channel', 'userstate', 'message');
      expect(spy).toHaveBeenCalledWith('userstate', 'message');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events, 'cheer').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('cheer');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('message event', () => {
    it('listens to the message event', async () => {
      expect(client.on).toHaveBeenCalledWith('message', expect.any(Function));
    });

    it('passes the message to the message handler', () => {
      const spy = jest.spyOn(messageHandler, 'default');
      // @ts-ignore
      client.emit('message', 'channel', 'userstate', 'message', 'self');
      expect(spy).toHaveBeenCalledWith('userstate', 'message');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(messageHandler, 'default').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('message');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('raided event', () => {
    it('listens to the raided event', async () => {
      expect(client.on).toHaveBeenCalledWith('raided', expect.any(Function));
    });

    it('passes the raid to our events handler', () => {
      const spy = jest.spyOn(events, 'raid');
      // @ts-ignore
      client.emit('raided', 'channel', 'username', 'viewers');
      expect(spy).toHaveBeenCalledWith({
        username: 'username',
        viewers: 'viewers',
      });
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events, 'raid').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('raided');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('resub event', () => {
    it('listens to the resub event', async () => {
      expect(client.on).toHaveBeenCalledWith('resub', expect.any(Function));
    });

    it('passes the resub to our events handler', () => {
      const spy = jest.spyOn(events.subscription, 'resub');
      // @ts-ignore
      client.emit('resub', 'channel', 'username', 'months', 'message', 'userstate', 'methods');
      expect(spy).toHaveBeenCalledWith('userstate', 'message');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events.subscription, 'resub').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('resub');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('roomstate event', () => {
    it('listens to the roomstate event', async () => {
      expect(client.on).toHaveBeenCalledWith('roomstate', expect.any(Function));
    });

    it('passes the roomstate to our events handler', () => {
      const spy = jest.spyOn(events.state, 'setRoomstate');
      // @ts-ignore
      client.emit('roomstate', 'channel', 'state');
      expect(spy).toHaveBeenCalledWith('state');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events.state, 'setRoomstate').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('roomstate');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('subgift event', () => {
    it('listens to the subgift event', async () => {
      expect(client.on).toHaveBeenCalledWith('subgift', expect.any(Function));
    });

    it('passes the subgift to our events handler', () => {
      const spy = jest.spyOn(events.subscription, 'subgift');
      // @ts-ignore
      client.emit(
        'subgift',
        'channel',
        'username',
        'streakMonths',
        'recipient',
        'methods',
        'userstate',
      );
      expect(spy).toHaveBeenCalledWith('userstate');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events.subscription, 'subgift').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('subgift');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('submysterygift event', () => {
    it('listens to the submysterygift event', async () => {
      expect(client.on).toHaveBeenCalledWith('submysterygift', expect.any(Function));
    });

    it('passes the submysterygift to our events handler', () => {
      const spy = jest.spyOn(events.subscription, 'submysterygift');
      // @ts-ignore
      client.emit('submysterygift', 'channel', 'username', 'numOfSubs', 'methods', 'userstate');
      expect(spy).toHaveBeenCalledWith('userstate', 'numOfSubs');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events.subscription, 'submysterygift').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('submysterygift');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('subscription event', () => {
    it('listens to the subscription event', async () => {
      expect(client.on).toHaveBeenCalledWith('subscription', expect.any(Function));
    });

    it('passes the subscription to our events handler', () => {
      const spy = jest.spyOn(events.subscription, 'newSub');
      // @ts-ignore
      client.emit('subscription', 'channel', 'username', 'method', 'message', 'userstate');
      expect(spy).toHaveBeenCalledWith('userstate');
    });

    it('logs any errors', () => {
      const err = new Error('Mock Error');
      jest.spyOn(events.subscription, 'newSub').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      // @ts-ignore
      client.emit('subscription');
      expect(spy).toHaveBeenCalledWith(err);
    });
  });

  describe('deleteMessage method', () => {
    it('does nothing if NO_ACTIONS is defined', () => {
      process.env.NO_ACTIONS = 'true';
      twitchIrc.deleteMessage('someUUID');
      expect(client.deletemessage).not.toHaveBeenCalled();
    });

    it('deletes the message if NO_ACTIONS is undefined', () => {
      delete process.env.NO_ACTIONS;
      twitchIrc.deleteMessage('someUUID');
      expect(client.deletemessage).toHaveBeenCalledWith(expect.any(String), 'someUUID');
    });

    /*it('logs any errors', () => {
      process.env.NO_ACTIONS = 'true';
      const err = new Error('Mock Error');
      jest.spyOn(client, 'deletemessage').mockImplementation(() => {
        throw err;
      });
      const spy = jest.spyOn(logger, 'error');
      twitchIrc.deleteMessage('someUUID');
      expect(spy).toHaveBeenCalledWith(err);
    });*/
  });

  describe('say method', () => {
    it('does nothing if NO_ACTIONS is defined', () => {
      process.env.NO_ACTIONS = 'true';
      twitchIrc.say('someMessage');
      expect(client.say).not.toHaveBeenCalled();
    });

    it('says the passed message if NO_ACTIONS is undefined', () => {
      delete process.env.NO_ACTIONS;
      twitchIrc.say('someMessage');
      expect(client.say).toHaveBeenCalledWith(expect.any(String), 'someMessage');
    });
  });
});
