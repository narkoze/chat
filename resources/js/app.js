import axios from 'axios'
import Window from './components/Window.vue'
import router from './router'
import store from './store'
import echo from './echo'
import Vue from './vue'

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

      echo.options.auth.headers.Authorization = bearer
      axios.defaults.headers.common.Authorization = bearer

      this.$store.commit('SET_AUTH', { user, bearer })

      this.$store.dispatch('getMessages')
      this.$store.dispatch('listenChat')
    } else {
      this.$router.replace({ name: 'Login' })
    }
  }
})
