import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import ErrorAlert from './components/ErrorAlert'
Vue.component('error-alert', ErrorAlert)

const eventBus = new Vue({})
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return eventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})

