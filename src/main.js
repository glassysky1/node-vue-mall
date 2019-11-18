import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import http from "./http";

Vue.prototype.$http = http
Vue.config.productionTip = false


import * as echarts from 'echarts/lib/echarts';
// 引入 echarts 主模块。
import 'echarts/lib/echarts'
// 引入柱形图
import 'echarts/lib/chart/bar'
//// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

Vue.prototype.$echarts = echarts;

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
