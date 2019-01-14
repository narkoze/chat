import Chat from './components/chat.vue'
// import Echo from 'laravel-echo'
import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import icons from './icons'

Vue.use(Vuex)
Vue.component('font-awesome-icon', icons)

// window.io = require('socket.io-client')

// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001'
// })

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default new Vue({
  el: '#chat',
  store,
  components: {
    Chat
  }
})
