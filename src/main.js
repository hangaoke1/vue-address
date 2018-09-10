import Vue from 'vue'
import App from './App.vue'
import VueAddress from './lib/index'

Vue.use(VueAddress)

window.gvm = new Vue({
  el: '#app',
  render: h => h(App)
})
