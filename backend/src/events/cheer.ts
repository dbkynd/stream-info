import tmi from 'tmi.js';
import tmiParser from 'tmi.parser';
import CheerService from '../database/lib/cheer';
import * as emotes from '../emotes';
import logger from '../logger';
import * as io from '../server/socket.io';

function cheer(userstate: tmi.ChatUserstate, message: string): void {
  if (userstate['user-id'] === '251095562') return; // Ignore Coil_Twitch_Bot
  logger.info(`new cheer - ${userstate.username}`);

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
}

function hypechat(userstate: tmi.ChatUserstate): void {
  if (userstate['user-id'] === '251095562') return; // Ignore Coil_Twitch_Bot
  logger.info(`new hypechat - ${userstate.tags['display-name']}`);
  const message = userstate.params[1];
  const parsedUserstate = tmiParser.emotes(userstate.tags);

  const payload: CheerPayload = {
    userstate: parsedUserstate,
    message,
    emotes: emotes.parseCheerMessage(parsedUserstate, message),
  };

  // Emit to client regardless if successful database save
  const cheerDoc = CheerService.create(payload, userstate['tmi-sent-ts']);
  io.emit('cheer', cheerDoc);
  CheerService.save(cheerDoc).catch((e) => {
    logger.error(e);
  });
}

export default {
  cheer,
  hypechat,
};
