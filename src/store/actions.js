/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:23
 * @LastEditors: majiaao
 * @LastEditTime: 2019-04-27 00:39:13
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE,
  CHANGE_LOGIN_DIALOG_NUM,
  LOGIN,
  LOGOUT,
  SETUSERNAME,
  SETUSERICONURL,
  ACTIVATE,
} from './mutations_types'
export default {
  changeDialogState ({commit},stark) {
    commit(CHANGE_LOGIN_DIALOG_STATE,stark)
  },
  changeLoginDialogNum({commit},stark) {
    commit(CHANGE_LOGIN_DIALOG_NUM,stark)
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
  },
  setActivate ({commit}) {
    commit(ACTIVATE)
  }
}
