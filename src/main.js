import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import animated from 'animate.css' 




Vue.use(VueAxios, axios,animated)
Vue.config.productionTip = false

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
