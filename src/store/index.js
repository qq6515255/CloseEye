import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 模块1
const modulea={
  state: {
    isPause:true,
    name:'sb'
  },
  getters:{
    test(){
      
    }
  },
  mutations: {
    getisPause(){
      window.console.log(this.isPause);
    }
  },
  actions: {
  },
  modules: {
  }
}

export default new Vuex.Store({
  modules:{
    a:modulea,
  }
})
