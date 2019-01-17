import actions from './actions'
import Chat from './components/chat.vue'
import Echo from 'laravel-echo'
import getters from './getters'
import icons from './icons'
import mutations from './mutations'
import routes from './routes'
import state from './state'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.component('font-awesome-icon', icons)

window.io = require('socket.io-client')

Vue.prototype.$echo = channel => new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:6001`
}).channel(channel)

export default new Vue({
  el: '#chat',
  router: new VueRouter({
    mode: 'history',
    routes
  }),
  store: new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  }),
  components: {
    Chat
  }
})
