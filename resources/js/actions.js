import router from './router'
import echo from './echo'
import axios from 'axios'

export default {
  async login ({ state, dispatch, commit }) {
    commit('SET_LOGIN_IN_PROGRESS', true)
    commit('CLEAR_ERRORS')

    await axios
      .post('api/login', {
        email: state.auth.email,
        password: state.auth.password
      })
      .then(response => {
        dispatch('loggedIn', response.data)
        commit('SET_PASSWORD_INPUT_VISIBLE', false)
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit('SET_EMAIL_ERROR', 'The specified email is correct?')
          commit('SET_PASSWORD_ERROR', 'Maybe the password field is incorrect?')
        }
        dispatch('handleErrors', error)
      })

    commit('SET_LOGIN_IN_PROGRESS', false)
  },
  async register ({ state, dispatch, commit }) {
    commit('SET_REGISTER_IN_PROGRESS', true)
    commit('CLEAR_ERRORS')

    await axios
      .post('api/register', {
        email: state.auth.email,
        name: state.auth.name,
        password: state.auth.password,
        password_confirmation: state.auth.password_confirmation
      })
      .then(response => {
        dispatch('loggedIn', response.data)
        commit('SET_PASSWORD_INPUT_VISIBLE', false)
        commit('SET_REGISTER_FIELDS_VISIBLE', false)
      })
      .catch(error => {
        dispatch('handleErrors', error)
      })

    commit('SET_REGISTER_IN_PROGRESS', false)
  },
  loggedIn ({ dispatch, commit }, data) {
    let user = data.user
    let token = data.token
    let bearer = `${token.token_type} ${token.access_token}`

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))

    echo.options.auth.headers.Authorization = bearer
    axios.defaults.headers.common.Authorization = bearer

    commit('SET_AUTH', { user, bearer })

    dispatch('getMessages')
    dispatch('listenChat')

    router.replace({ name: 'Chat' })
  },
  async logout ({ dispatch, commit }) {
    commit('SET_LOGOUT_IN_PROGRESS', true)

    await axios
      .get('api/logout')
      .then(() => {
        echo.leave('chat')

        delete echo.options.auth.headers.Authorization

        delete axios.defaults.headers.common.Authorization
        delete axios.defaults.headers.common['X-Socket-ID']

        localStorage.removeItem('user')
        localStorage.removeItem('token')

        commit('CLEAR_AUTH')

        router.replace({ name: 'Login' })
      })
      .catch(error => {
        dispatch('handleErrors', error)
      })

    commit('SET_LOGOUT_IN_PROGRESS', false)
  },
  listenChat ({ commit }) {
    echo
      .join('chat')
      .here(users => {
        commit('SET_USERS', users)
      })
      .joining(user => {
        commit('PUSH_USER', user)
      })
      .leaving(user => {
        commit('REMOVE_USER', user)
      })
      .listen('MessageEvent', ({ message }) => {
        commit('PUSH_MESSAGE', message)
      })
  },
  async getMessages ({ dispatch, commit }) {
    commit('SET_GET_MESSAGES_IN_PROGRESS', true)

    await axios
      .get('api/message')
      .then(response => {
        commit('SET_MESSAGES', response.data.data)
      })
      .catch(error => {
        dispatch('handleErrors', error)
      })

    commit('SET_GET_MESSAGES_IN_PROGRESS', false)
  },
  async sendMessage ({ state, dispatch, commit }) {
    commit('SET_SEND_MESSAGE_IN_PROGRESS', true)
    commit('CLEAR_ERRORS')

    await axios
      .post(
        'api/message',
        {
          content: state.message.content
        },
        {
          headers: {
            'X-Socket-ID': echo.socketId()
          }
        }
      )
      .then(response => {
        commit('PUSH_MESSAGE', response.data.data)
        commit('CLEAR_MESSAGE')
      })
      .catch(error => {
        dispatch('handleErrors', error)
      })

    commit('SET_SEND_MESSAGE_IN_PROGRESS', false)
  },
  handleErrors ({ commit }, error) {
    switch (error.response.status) {
      case 401:
        router.replace({ name: 'Login' })
        break
      case 422:
        commit('SET_ERRORS', error.response.data.errors)
        break
      default:
        commit('SET_GLOBAL_ERROR', error.response)
    }
  }
}
