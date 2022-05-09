import { createStore } from 'vuex';
import VuexNow from 'vuex-now';
import { api } from '@/plugins/axios';
import lists from './lists';

const now = VuexNow(1000 * 60);

const store = createStore({
  state: {
    roomstate: {},
    appState: {},
    settings: {},
    settingsDialog: null,
  },
  getters: {},
  mutations: {
    updateTime(state) {
      state.now = Date.now();
    },
    SOCKET_appState(state, payload) {
      state.appState = Object.assign({}, state.appState, payload);
    },
    SOCKET_roomstate(state, payload) {
      state.roomstate = Object.assign({}, state.roomstate, payload);
    },
    setSettings(state, payload) {
      state.settings = Object.assign({}, state.settings, payload);
    },
    setSettingsDialog(state, payload) {
      state.settingsDialog = payload;
    },
  },
  actions: {
    SOCKET_state({ commit }, payload) {
      commit('SOCKET_appState', payload.appState);
      commit('SOCKET_roomstate', payload.roomstate);
    },
    updateSettings({ commit }, payload) {
      api.put('/user/settings', { settings: payload }).then(() => {
        commit('setSettings', payload);
      });
    },
  },
  modules: {
    lists,
  },
  plugins: [now],
});

export default store;
