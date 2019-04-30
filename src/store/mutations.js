/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:34
 * @LastEditors: majiaao
 * @LastEditTime: 2019-04-27 00:38:02
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
  CHANGE_LOGIN_DIALOG_NUM,
  LOGOUT,
  LOGIN,
  SETUSERNAME,
  SETUSERICONURL,
  ACTIVATE
} from './mutations_types'
export default {
  [CHANGE_LOGIN_DIALOG_STATE] (state, stark) {
    state.userDialogState = !state.userDialogState
    if (stark !== undefined) {
      state.userDialogNum = stark.currentIndex
    }
  },
  [CHANGE_LOGIN_DIALOG_NUM] (state,stark) {
    state.userDialogNum = stark
  },
  [LOGOUT] (state) {
    state.isLogin = false
  },
  [LOGIN] (state) {
    state.isLogin = true
  },
  [SETUSERNAME] (state, stark) {
    state.userName = stark
  },
  [SETUSERICONURL] (state, stark) {
    state.userIconUrl = stark
  },
  [ACTIVATE] (state) {
    state.isActivate = true
  }
}
