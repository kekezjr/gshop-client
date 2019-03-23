/**
 * Created by Administrator on 2019/3/19 0019.
 */
// 包含多个间接更新状态数据方法的对象
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  reqLogout
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RESET_USER,
  RECEIVE_USER
} from './mutation-types'

export default {


  // // 记录用户信息的同步action
  // saveUser ({commit}, user) {
  //   commit(RECEIVE_USER, user)
  // },
  //
  // // 异步获取用户信息
  // async getUser ({commit}) {
  //   const result = await reqUser()
  //   if (result.code === 0) {
  //     const user = result.data
  //     commit(RECEIVE_USER, user)
  //   }
  // },
  //
  // // 退出登录的异步action
  // async logout ({commit}) {
  //   const result = await reqLogout()
  //   if (result.code === 0) {
  //     commit(RESET_USER)
  //   }
  // },

  //
}
