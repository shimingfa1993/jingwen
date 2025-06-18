import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

Vue.config.productionTip = false

// Global event bus for component communication
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 