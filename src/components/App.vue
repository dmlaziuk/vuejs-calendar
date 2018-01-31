<template>
  <div id="app">
    <app-header/>
    <day-bar/>
    <calendar/>
    <event-form/>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import store from '../store'
import Calendar from './Calendar.vue'
import DayBar from './DayBar.vue'
import AppHeader from './AppHeader.vue'
import EventForm from './EventForm.vue'

moment.tz.setDefault('UTC')

let events = window.__EVENTS__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
})

let initialState = Object.assign({}, store.state, { events })

store.replaceState(initialState)

export default {
  components: { AppHeader, DayBar, Calendar, EventForm },
  store
}
</script>
