import VueSocketIO from 'vue-3-socket.io';
import { io } from 'socket.io-client';
import store from '@/store';

let socket;

export function connect() {
  if (socket) return;
  socket = io({ path: '/ws/socket.io' });
  new VueSocketIO({
    debug: false,
    connection: socket,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  });

  socket.on('connect', () => {
    console.log('SOCKET CONNECTED');
    store.commit('SOCKET_appState', { clientWs: true });
    store.dispatch('getLists').catch();
  });

  socket.on('disconnect', () => {
    console.log('SOCKET DISCONNECTED');
    store.commit('SOCKET_appState', {
      clientWs: false,
      seWs: false,
      twitchIrc: false,
    });
  });
}

export function emit(event, data) {
  if (socket) socket.emit(event, data);
}
