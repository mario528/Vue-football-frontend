/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:23
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-26 01:14:43
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
  LOGIN,
  LOGOUT,
  SETUSERNAME,
  SETUSERICONURL
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
  },
  setUsername ({commit}, stark) {
    commit(SETUSERNAME, stark)
  },
  setUserIconUrl ({commit}, stark) {
    commit(SETUSERICONURL, stark)
  }
}
