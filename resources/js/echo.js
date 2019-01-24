import Echo from 'laravel-echo'

window.io = require('socket.io-client')

export default new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:6001`,
  auth: {
    headers: {
      Authorization: null
    }
  }
})
