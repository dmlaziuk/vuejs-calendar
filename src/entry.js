import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

export default (events) => {
  let initialState = Object.assign({}, store.state, { events })

  store.replaceState(initialState)

  return new Vue({
    store,
    ...App
  })
}
