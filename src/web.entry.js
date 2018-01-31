import './style.scss'
import moment from 'moment-timezone'
import AppEntry from './entry'

moment.tz.setDefault('UTC')

let events = window.__EVENTS__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
})

AppEntry(events).$mount('#app')
