// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import OmHttp from './components/global/axios'
import {
  Button,
  Progress
} from 'mint-ui'

import './scss/normalize.css'

Vue.config.productionTip = false

Vue.use(Croppa)
Vue.use(OmHttp)
Vue.component('om-button', Button)
Vue.component('om-progress', Progress)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
