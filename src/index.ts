import Vue from 'vue'
import Clipboard from 'v-clipboard'

import store from './store'
import router from './router'

import App from './App.vue'
 
Vue.use(Clipboard)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
