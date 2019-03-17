/**
 * Created by Administrator on 2019/3/17 0017.
 */
// 路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 去掉#号
  routes
})
