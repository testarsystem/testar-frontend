import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import M from 'materialize-css'

global.M = M;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
