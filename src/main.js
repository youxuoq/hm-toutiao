// main.js的职责 加载项目下所有需要的资源文件 和 js模块  实例化根实例 渲染组件 挂载根实例中

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from '@/api/axios'
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
