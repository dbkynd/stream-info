// https://github.com/StreamElements/api-docs/blob/main/docs/Websockets.md

import io, { Socket } from 'socket.io-client';
import events from '../events';
import logger from '../logger';

let socket: typeof Socket;
let channelId: string;

export function connect(): void {
  socket = io('https://realtime.streamelements.com', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    socket.emit('authenticate', {
      method: 'jwt',
      token: process.env.STREAMELEMENTS_JWT,
    });
  });

  socket.on('authenticated', async (data: SE_WS_AuthData) => {
    channelId = data.channelId;
    logger.info(`Connected to StreamElements channel ${channelId}`);
    events.state.updateAppState({ seWs: true });
  });

  socket.on('unauthorized', () => {
    logger.error('StreamElements authentication error.');
    disconnect();
  });

  socket.on('disconnect', () => {
    logger.warn('Disconnected from StreamElements');
    events.state.updateAppState({ seWs: false });
  });

  socket.on('event', (event: SE_WS_Event) => {
    if (event.type === 'tip') events.tip(event);
  });
}

export function disconnect(): void {
  if (socket) socket.close();
}

export function getChannelId(): string {
  return channelId;
}
