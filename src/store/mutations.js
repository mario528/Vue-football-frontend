/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:34
 * @LastEditors: majiaao
 * @LastEditTime: 2019-04-17 11:34:31
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
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
