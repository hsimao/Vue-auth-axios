import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import authAPI from './axios-auth'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, authAPI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
