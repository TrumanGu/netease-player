import Vue from 'vue'
import axios from 'axios'

import '@/assets/css/normalize.css'
import '@/assets/css/index'

import App from './App'
import router from './router'
import store from './store'

import { parseTime } from '@/utils'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.filter('formatTime', parseTime)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
