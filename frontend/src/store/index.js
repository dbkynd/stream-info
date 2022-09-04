import { createStore } from 'vuex';
import VuexNow from 'vuex-now';
import { api } from '@/plugins/axios';
import lists from './lists';
import * as toasts from '@/plugins/toasts';

const now = VuexNow(1000 * 60);
let timer = null;

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
      if (payload.toast === false) return;
      const key = Object.keys(payload)[0];
      toasts.appState(key, payload[key]);
    },
    SOCKET_roomstate(state, payload) {
      state.roomstate = Object.assign({}, state.roomstate, payload);
      if (payload.toast === false) return;
      for (const key in payload) {
        if (key !== 'room-id' && key !== 'channel')
          toasts.roomstate(key, payload[key]);
      }
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
      commit('SOCKET_appState', { ...payload.appState, toast: false });
      commit('SOCKET_roomstate', { ...payload.roomstate, toast: false });
    },
    updateSettings({ commit }, payload) {
      api.put('/user/settings', { settings: payload }).then(() => {
        commit('setSettings', payload);
      });
    },
    updateSettingsWithCooldown({ commit }, payload) {
      if (timer) clearTimeout(timer);
      commit('setSettings', payload);
      timer = setTimeout(() => {
        api.put('/user/settings', { settings: payload }).then(() => {});
      }, 1000);
    },
  },
  modules: {
    lists,
  },
  plugins: [now],
});

export default store;
