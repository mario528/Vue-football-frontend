/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:51:23
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-18 15:35:14
 * @Description: file content
 */
import {
  CHANGE_LOGIN_DIALOG_STATE
} from './mutations_types'
export default {
  changeDialogState ({commit}) {
    commit(CHANGE_LOGIN_DIALOG_STATE)
  }
}
