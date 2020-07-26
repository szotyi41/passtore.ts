import Vue from 'vue'
import Clipboard from 'v-clipboard'
import VueI18n from 'vue-i18n'

import localization from './localization'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.use(VueI18n)
Vue.use(Clipboard)

const i18n = new VueI18n({
  locale: 'en',
  ...localization
});


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
