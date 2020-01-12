import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 模块1
const moduleA = {
  state: {
    dayCoverShow: false,
    nextHomeUrl:'',
    playerData:{},
  },
  getters: {
    getdayCoverShow(state) {
      return state.dayCoverShow;
    },
    getnextHomeUrl(state) {
      return state.dayCoverShow;
    },
    getplayerData(state) {
      return state.playerData;
    },

  },
  mutations: {
    setdayCoverShow(state, value) {
      state.dayCoverShow = value;
    },
 
    setplayerData(state, obj) {
      state.playerData = obj;
    },
 
  },
  actions: {
    // postIndexDate(context) {
    //   getIndex().then(res => {
    //     if (res.status === 200) {
    //       context.commit('setdayindexDate',res.data.data)
    //       window.console.log(res);
    //     }
    //   });
    // }
  }
};

export default new Vuex.Store({
  modules: {
    a: moduleA
  }
});
