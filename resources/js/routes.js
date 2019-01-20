import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'

export default [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'Login',
    path: '/Login',
    component: Login
  },
  {
    name: 'LoggedIn',
    path: '/LoggedIn',
    component: LoggedIn
  },
]
