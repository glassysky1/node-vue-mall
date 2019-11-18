import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import http from "./http";
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'


// register component to use
Vue.component('v-chart', ECharts)

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
