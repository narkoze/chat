import Login from './components/Login.vue'
import Chat from './components/Chat.vue'

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
    name: 'Chat',
    path: '/Chat',
    component: Chat
  },
]
