import router from './router'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

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
  loggedIn ({ commit }, data) {
    let user = data.user
    let token = data.token
    let bearer = `${token.token_type} ${token.access_token}`

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))

    window.axios.defaults.headers.common.Authorization = bearer

    commit('SET_AUTH', {
      user,
      bearer
    })

    router.replace({ name: 'LoggedIn' })
  },
  async logout ({ dispatch, commit }) {
    commit('SET_LOGOUT_IN_PROGRESS', true)

    await axios
      .get('api/logout')
      .then(() => {
        delete axios.defaults.headers.common.Authorization

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
  handleErrors({ commit }, error) {
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
