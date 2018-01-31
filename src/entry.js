import Vue from 'vue'
import App from './components/App.vue'

export default (events) => {
  return new Vue({
    ...App
  })
}
