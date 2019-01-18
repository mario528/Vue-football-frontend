/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:34
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-18 15:39:26
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE
} from './mutations_types'
export default {
  [CHANGE_LOGIN_DIALOG_STATE] (state, stark) {
    state.userDialogState = !state.userDialogState
    if (stark !== undefined) {
      state.userDialogNum = stark.currentIndex
    }
  }
}
