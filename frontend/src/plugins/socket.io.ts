import { io, Socket } from 'socket.io-client';
import VueSocketIO from 'vue-3-socket.io';
import { store } from '@/store';

let socket: Socket;

export function connect() {
  if (socket) return;
  socket = io();
  new VueSocketIO({
    debug: false,
    connection: socket,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  });

  socket.on('connect', async () => {
    console.log('SOCKET CONNECTED');
    await store.dispatch('SOCKET_appState', { clientWs: true });
    await store.dispatch('getLists');
  });

  socket.on('disconnect', async () => {
    console.log('SOCKET DISCONNECTED');
    await store.dispatch('SOCKET_appState', {
      clientWs: false,
      seWs: false,
      twitchIrc: false,
    });
  });
}

export function emit(event: string, data: unknown) {
  if (socket) socket.emit(event, data);
}
