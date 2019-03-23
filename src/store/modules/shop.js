/**
 * Created by Administrator on 2019/3/21 0021.
 */
// 商家模块
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from '../mutation-types'

import {
  reqInfo,
  reqRatings,
  reqGoods
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {} // 商家信息
}

const mutations = {
  [RECEIVE_INFO] (state, info) {
    state.info = info
  },

  [RECEIVE_RATINGS] (state, ratings) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS] (state, goods) {
    state.goods = goods
  }
}

const actions = {
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      console.log(info)
      commit(RECEIVE_INFO, info)
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, ratings)
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, goods)
      // 状态数据更新完之后立即调用
      typeof callback === 'function' && callback()
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

