<template>
  <div id="app">
    <app-header/>
    <day-bar/>
    <calendar/>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import store from '../store'
import Calendar from './Calendar.vue'
import DayBar from './DayBar.vue'
import AppHeader from './AppHeader.vue'

moment.tz.setDefault('UTC')

export default {
  components: { AppHeader, DayBar, Calendar },
  store
}
</script>
