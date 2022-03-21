import tmi from 'tmi.js';
import CheerService from '../database/lib/cheer';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

export default (userstate: tmi.ChatUserstate, message: string): void => {
  if (userstate['user-id'] === '251095562') return; // Ignore Coil_Twitch_Bot

  logger.debug('new cheer');
  const payload: CheerPayload = {
    userstate,
    message,
    emotes: emotes.parseCheerMessage(userstate, message),
  };

  // Emit to client regardless if successful database save
  const cheerDoc = CheerService.create(payload, userstate['tmi-sent-ts']);
  io.emit('cheer', cheerDoc);
  CheerService.save(cheerDoc).catch((e) => {
    logger.error(e);
  });
};
