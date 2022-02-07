import http from 'http';
import { Server } from 'socket.io';
import * as state from '../events/state';
import logger from '../logger';

let io: Server;

export default function (server: http.Server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    logger.info('SOCKET CONNECTED');
    socket.emit('state', {
      appState: state.getAppState(),
      roomstate: state.getRoomstate(),
    });

    socket.on('disconnect', () => {
      logger.info('SOCKET DISCONNECTED');
    });
  });
}

export function emit(event: string, data?: unknown): void {
  if (io) io.emit(event, data);
}
