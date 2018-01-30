<template>
  <div id="header">
    <div>
      <h1>Vue.js Calendar</h1>
    </div>
    <div>
      <current-month/>
    </div>
  </div>
</template>

<script>
import CurrentMonth from './CurrentMonth.vue'
export default {
  components: { CurrentMonth }
}
</script>
