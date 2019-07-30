import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from '@/router'
import store from '@/store'
import utils from '@/utils/vue'
import components from '@/components'

import 'lib-flexible'

import 'vant/lib/index.css'
import '@/styles/index.less'

Vue.use(Vant)
Vue.use(components)
Vue.use(utils)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
