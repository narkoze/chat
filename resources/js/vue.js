import Vue from 'vue'
import moment from 'moment'
import icons from './icons'

Vue.component('font-awesome-icon', icons)

Vue.filter('dateFormat', value => {
  let date = moment(value)

  if (!date.isValid()) return ''

  if (date.isSame(moment(), 'day')) return date.format('HH:mm')

  return date.format('YYYY-MM-DD HH:mm')
})

export default Vue
