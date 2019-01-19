/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:23
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-19 13:47:38
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
  LOGIN,
  LOGOUT
} from './mutations_types'
export default {
  changeDialogState ({commit}) {
    commit(CHANGE_LOGIN_DIALOG_STATE)
  },
  login ({commit}) {
    commit(LOGIN)
  },
  logout ({commit}) {
    commit(LOGOUT)
  }
}
