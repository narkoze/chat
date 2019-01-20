export default {
  SET_LOGIN_IN_PROGRESS (state, boolean) {
    state.loginInProgress = boolean
  },
  SET_LOGOUT_IN_PROGRESS (state, boolean) {
    state.logoutInProgress = boolean
  },
  SET_REGISTER_IN_PROGRESS (state, boolean) {
    state.registerInProgress = boolean
  },
  SET_EMAIL (state, email) {
    state.auth.email = email
  },
  SET_EMAIL_ERROR (state, error = 'The email field is required.') {
    state.errors = {
      ...state.errors,
      email: [
        error,
      ]
    }
  },
  CLEAR_EMAIL_ERROR (state) {
    delete state.errors.email
  },
  SET_NAME (state, name) {
    state.auth.name = name
  },
  SET_PASSWORD (state, password) {
    state.auth.password = password
  },
  SET_PASSWORD_ERROR (state, error = 'The password field is required.') {
    state.errors = {
      ...state.errors,
      password: [
        error,
      ]
    }
  },
  SET_PASSWORD_INPUT_VISIBLE (state, boolean) {
    state.passwordInputVisible = boolean
  },
  SET_PASSWORD_CONFIRMATION (state, password_confirmation) {
    state.auth.password_confirmation = password_confirmation
  },
  SET_AUTH (state, auth) {
    delete state.auth.password
    delete state.auth.password_confirmation

    state.auth = {
      ...state.auth,
      ...auth.user,
      token: auth.bearer
    }
  },
  CLEAR_AUTH (state) {
    state.auth = {
      email: null,
      password: null,
      token: null
    }
  },
  SET_REGISTER_FIELDS_VISIBLE (state, boolean) {
    state.registerFieldsVisible = boolean
  },
  SET_ERRORS (state, errors) {
    state.errors = errors
  },
  CLEAR_ERRORS (state) {
    state.errors = {}
  },
  SET_GLOBAL_ERROR (state, error) {
    state.errorGlobal = error
  }
}
