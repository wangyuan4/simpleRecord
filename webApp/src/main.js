// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { ToastPlugin } from 'vux'
// import App from './App'
// import Login from './components/Login'
import Index from './Index'

import router from './router'

// global.IP = 'http://192.168.101.235:3320'
global.IP = 'localhost:3320'
Vue.use(VueRouter)
Vue.use(ToastPlugin)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(Index)
}).$mount('#app-box')
