import tmi from 'tmi.js';
import emotes from '../../emotes/twitch';
import logger from '../../logger';
import clipsHandler from './clips_handler';
import checkTags from './message_tags';

export default (userstate: tmi.ChatUserstate, message: string) => {
  const messageType = userstate['message-type'];
  if (!messageType || messageType === 'whisper') return;

  clipsHandler(userstate, message).catch((err) => {
    logger.error(err);
  });

  try {
    emotes.add(userstate, message);
  } catch (err) {
    logger.error(err);
  }

  checkTags(userstate);
};
