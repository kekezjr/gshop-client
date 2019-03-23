/**
 * Created by Administrator on 2019/3/19 0019.
 */
// vuex最核心的模块store

import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {
    msite,
    shop,
    user
  }
})
