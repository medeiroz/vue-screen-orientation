import Vue from 'vue'
import App from './App.vue'

// This is an example of loading it the global way.
// import VueScreenOrientation from '../src/index.js'
// Vue.use(VueScreenOrientation)

new Vue({
  el: '#app',
  render: h => h(App)
})