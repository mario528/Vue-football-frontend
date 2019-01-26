/*
 * @Author: majiaao
 * @Date: 2019-01-05 19:31:48
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-26 01:12:29
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  userDialogState: false, // 登陆弹窗
  isLogin: false, // 是否登陆
  userName: '', // 用户名
  sex: '', // 性别
  userIconUrl: '', // 用户头像
  favouriteTeam: '', // 喜欢的球队
  userDialogNum: 0, // 0: 登陆 1:注册
  isVip: true // 是否是VIP用户
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
