import { api } from '@/plugins/axios';

const maxArraySize = 100;

export default {
  namespaced: true,
  state: () => ({
    cheers: [],
    hosts: [],
    subscriptions: [],
    tips: [],
  }),
  mutations: {
    SOCKET_cheer(state, payload) {
      if (state.cheers.includes(payload._id)) return;
      state.cheers.unshift(payload);
      if (state.cheers.length > maxArraySize) state.cheers.pop();
    },
    SOCKET_host(state, payload) {
      if (state.hosts.includes(payload._id)) return;
      state.hosts.unshift(payload);
      if (state.hosts.length > maxArraySize) state.hosts.pop();
    },
    SOCKET_subscription(state, payload) {
      if (state.subscriptions.includes(payload._id)) return;
      state.subscriptions.unshift(payload);
      if (state.subscriptions.length > maxArraySize) state.subscriptions.pop();
    },
    SOCKET_tip(state, payload) {
      if (state.tips.includes(payload._id)) return;
      state.tips.unshift(payload);
      if (state.tips.length > maxArraySize) state.tips.pop();
    },
    setLists(state, payload) {
      add(payload.cheers, state.cheers);
      add(payload.hosts, state.hosts);
      add(payload.subscriptions, state.subscriptions);
      add(payload.tips, state.tips);

      function add(array, target) {
        for (let i = array.length - 1; i >= 0; i--) {
          const ids = target.map((x) => x._id);
          if (!ids.includes(array[i]._id)) {
            target.unshift(array[i]);
            if (target.length > maxArraySize) target.pop();
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
      api.post('/clear/all').catch();
    },
  },
  actions: {
    getLists({ commit }) {
      api.get('/lists').then(({ data }) => {
        commit('setLists', data);
      });
    },
  },
  getters: {},
};
