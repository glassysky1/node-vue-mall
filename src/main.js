import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import http from "./http";

Vue.prototype.$http = http
Vue.config.productionTip = false


Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
