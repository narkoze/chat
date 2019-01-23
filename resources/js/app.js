import Vue from 'vue'
import router from './router'
import store from './store'
import Window from './components/Window.vue'
import Echo from 'laravel-echo'
import icons from './icons'
import axios from 'axios'

Vue.component('font-awesome-icon', icons)

window.io = require('socket.io-client')
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:6001`,
  auth: {
    headers: {
      Authorization: null
    }
  }
})

export default new Vue({
  el: '#Chat',
  router: router,
  store: store,
  components: {
    Window
  },
  created () {
    let tokenStorage = localStorage.getItem('token')
    if (tokenStorage) {
      let user = JSON.parse(localStorage.getItem('user'))
      let token = JSON.parse(tokenStorage)
      let bearer = `${token.token_type} ${token.access_token}`

      window.Echo.options.auth.headers.Authorization = bearer

      axios.defaults.headers.common.Authorization = bearer
      axios.defaults.headers.common['X-Socket-ID'] = window.Echo.socketId(),

      this.$store.commit('SET_AUTH', { user, bearer })
      this.$store.dispatch('listenChat')
    } else {
      this.$router.replace({ name: 'Login' })
    }
  }
})
