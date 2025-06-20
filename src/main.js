import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'
import { ErrorHandlerPlugin } from './utils/errorHandler'

Vue.config.productionTip = false

// Install error handler plugin
Vue.use(ErrorHandlerPlugin)

// Global event bus for component communication
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 