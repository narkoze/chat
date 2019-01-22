export default {
  auth: {
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
    token: null
  },
  passwordInputVisible: false,
  registerFieldsVisible: false,
  registerInProgress: false,
  loginInProgress: false,
  logoutInProgress: false,
  getMessagesInProgress: false,
  sendMessageInProgress: false,
  users: [],
  messages: [],
  message: {},
  errorGlobal: null,
  errorEmail: null,
  errors: {}
}
