/**
 * Created by Administrator on 2019/3/21 0021.
 */
// 用户模块
import {
  RESET_USER,
  RECEIVE_USER,
} from '../mutation-types'

import {
  reqUser,
  reqLogout
} from '../../api'

const state = {
  user: {} // 用户信息
}

const mutations = {
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
}

const actions = {
  // 记录用户信息的同步action
  saveUser ({commit}, user) {
    commit(RECEIVE_USER, user)
  },

  // 异步获取用户信息
  async getUser ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER, user)
    }
  },

  // 退出登录的异步action
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  }
}

const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}

