// 应用入口文件
import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './store'
import Star from './components/Star/Star.vue'
import './mock/mockServer'
import CartControl from './components/CartControl/CartControl.vue'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button)
Vue.component('CartControl', CartControl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router, // 配置路由器
  store // 配置vuex
})
