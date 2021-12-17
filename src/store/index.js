import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 'ALL',
    mode: 0
  },
  mutations: {
    updateId(state, payload){
      state.id = payload;
    },
    updateMode(state, payload){
      state.mode = payload
    },
  },
  getters: {
    mode(state){
      return state.mode;
    },
    id(state){
      return state.id;
    }
  }
})