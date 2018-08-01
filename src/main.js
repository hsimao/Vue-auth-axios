import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import authAPI from './axios-auth'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(VueAxios, authAPI)
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
