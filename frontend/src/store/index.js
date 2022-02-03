import { createStore } from 'vuex';

export default createStore({
  state: {
    roomstate: {},
  },
  mutations: {
    SOCKET_roomstate(state, payload) {
      state.roomstate = Object.assign({}, state.roomstate, payload);
    },
  },
  actions: {},
  modules: {},
});
