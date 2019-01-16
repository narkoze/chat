window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content

export default {
  increment ({ commit }, count) {
    axios
      .post('increment', { count })
      .then(response => {
        commit('increment', count)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
