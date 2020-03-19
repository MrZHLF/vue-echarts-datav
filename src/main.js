import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCharts from 'v-charts'
import axios from 'axios'
Vue.use(VCharts)
Vue.prototype.$axios = axios


// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(dataV)


import './styles/index.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
