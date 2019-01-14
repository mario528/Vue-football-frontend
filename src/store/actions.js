/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:23
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-14 15:47:15
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE
} from './mutations_types'
export default {
  changeDialogState ({commit}, ev) {
    commit(CHANGE_LOGIN_DIALOG_STATE)
  }
}
