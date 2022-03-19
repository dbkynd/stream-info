import { createStore } from 'vuex';
import VuexNow from 'vuex-now';
import { api } from '@/plugins/axios';

const maxArraySize = 100;
const now = VuexNow(1000 * 60);

const store = createStore({
  state: {
    roomstate: {},
    appState: {},
    cheers: [],
    hosts: [],
    subscriptions: [],
    tips: [],
  },
  getters: {
    cheers(state) {
      return state.cheers.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    },
    hosts(state) {
      return state.hosts.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    },
    subscriptions(state) {
      return state.subscriptions.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    },
    tips(state) {
      return state.tips.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    },
  },
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
    SOCKET_cheer(state, payload) {
      if (state.cheers.includes(payload._id)) return;
      state.cheers.push(payload);
      if (state.cheers.length > maxArraySize) state.cheers.shift();
    },
    SOCKET_host(state, payload) {
      if (state.hosts.includes(payload._id)) return;
      state.hosts.push(payload);
      if (state.hosts.length > maxArraySize) state.hosts.shift();
    },
    SOCKET_subscription(state, payload) {
      if (state.subscriptions.includes(payload._id)) return;
      state.subscriptions.push(payload);
      if (state.subscriptions.length > maxArraySize)
        state.subscriptions.shift();
    },
    SOCKET_tip(state, payload) {
      if (state.tips.includes(payload._id)) return;
      state.tips.push(payload);
      if (state.tips.length > maxArraySize) state.tips.shift();
    },
    setLists(state, payload) {
      add(payload.cheers, state.cheers);
      add(payload.hosts, state.hosts);
      add(payload.subscriptions, state.subscriptions);
      add(payload.tips, state.tips);

      function add(array, target) {
        for (let i = 0; i < array.length; i++) {
          const ids = target.map((x) => x._id);
          if (!ids.includes(array[i]._id)) {
            target.push(array[i]);
            if (target.length > maxArraySize) target.shift();
          }
        }
      }
    },
    SOCKET_clear(state, payload) {
      const doc = state[payload.name].find((x) => x._id === payload.id);
      if (doc) doc.cleared = true;
    },
    clearAll(state) {
      const unclearedCheers = state.cheers.filter((x) => !x.cleared);
      const unclearedHosts = state.hosts.filter((x) => !x.cleared);
      const unclearedSubs = state.subscriptions.filter((x) => !x.cleared);
      const unclearedTips = state.tips.filter((x) => !x.cleared);
      const uncleared = [].concat(
        unclearedCheers,
        unclearedHosts,
        unclearedSubs,
        unclearedTips,
      );
      uncleared.forEach((x) => (x.cleared = true));
    },
  },
  actions: {
    SOCKET_state({ commit }, payload) {
      commit('SOCKET_appState', payload.appState);
      commit('SOCKET_roomstate', payload.roomstate);
    },
    getLists({ commit }) {
      api.get('/lists').then(({ data }) => {
        commit('setLists', data);
      });
    },
  },
  modules: {},
  plugins: [now],
});

export default store;

setInterval(() => {
  // store.commit('updateTime');
}, 10000);
