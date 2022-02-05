import tmi from 'tmi.js';
import clipsHandler from './clips_handler';

export default (userstate: tmi.ChatUserstate, message: string) => {
  const messageType = userstate['message-type'];
  if (!messageType || messageType === 'whisper') return;
  clipsHandler(userstate, message).catch();
};
