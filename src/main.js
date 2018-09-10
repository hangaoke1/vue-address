import Vue from 'vue'
import App from './App.vue'
import XAddress from './lib/index'

Vue.use(XAddress)

window.gvm = new Vue({
  el: '#app',
  render: h => h(App)
})
