import { createStore } from 'vuex';

const store = createStore({
  state: {
    roomstate: {},
    appState: {},
    cheers: [],
    hosts: [],
    subscriptions: [],
    tips: [],
    now: Date.now(),
  },
  getters: {
    subscriptions(state) {
      return state.subscriptions.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    },
    cheers(state) {
      return state.cheers.sort((a, b) => {
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
      state.cheers.push(payload);
    },
    SOCKET_host(state, payload) {
      state.hosts.push(payload);
    },
    SOCKET_subscription(state, payload) {
      state.subscriptions.push(payload);
    },
    SOCKET_tip(state, payload) {
      state.tips.push(payload);
    },
    setLists(state, payload) {
      state.cheers = payload.cheers;
      state.hosts = payload.hosts;
      state.subscriptions = payload.subscriptions;
      state.tips = payload.tips;
    },
  },
  actions: {
    setState({ commit }, payload) {
      commit('SOCKET_appState', payload.appState);
      commit('SOCKET_roomstate', payload.roomstate);
    },
  },
  modules: {},
});

export default store;

setInterval(() => {
  // store.commit('updateTime');
}, 10000);
