import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 模块1
const moduleA = {
  state: {
    dayCoverShow: false
  },
  getters: {
    getdayCoverShow(state) {
      return state.dayCoverShow;
    }
  },
  mutations: {
    setdayCoverShow(state, value) {
      state.dayCoverShow = value;
    }
  },
  actions: {}
};

export default new Vuex.Store({
  modules: {
    a: moduleA
  }
});
