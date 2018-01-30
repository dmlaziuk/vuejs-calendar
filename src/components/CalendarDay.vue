<template>
  <div id="calendar-day" :class="classObject">
      {{ day.format('D') }}
  </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
  computed: {
    classObject () {
      let today = this.day.isSame(moment(), 'day')
      return {
        day: true,
        today,
        past: this.day.isSameOrBefore(moment(), 'day') && !today
      }
    }
  },
  props: [ 'day' ]
}
</script>
