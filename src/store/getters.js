/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:53:56
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-19 12:49:05
 * @Description: file content
 */
const getLoginState = function (state) {
  return state.userDialogState
}
const getIsVip = function (state) {
  return state.isVip
}
export default {
  getLoginState,
  getIsVip
}
