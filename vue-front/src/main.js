// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import io from 'socket.io-client'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)

window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    socket: io('http://localhost:5000')
  },
  mutations: {
  	
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
