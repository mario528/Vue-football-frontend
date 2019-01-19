/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:34
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-18 16:38:29
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
  LOGOUT,
  LOGIN
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
  }
}
