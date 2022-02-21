import tmi from 'tmi.js';
import CheerService from '../database/lib/cheer';
import logger from '../logger';
import * as io from '../server/socket.io';

export default async (
  userstate: tmi.ChatUserstate,
  message: string,
): Promise<void> => {
  if (userstate['user-id'] === '251095562') return; // Ignore Coil_Twitch_Bot

  logger.debug('new cheer');
  const payload: CheerPayload = {
    userstate,
    message,
  };

  // Emit to client regardless if successful database save
  const cheerDoc = CheerService.create(payload, userstate['tmi-sent-ts']);
  io.emit('cheer', cheerDoc);
  await CheerService.save(cheerDoc);
};
