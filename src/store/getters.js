/*
 * @Author: majiaao
 * @Date: 2019-01-12 15:53:56
 * @LastEditors: majiaao
 * @LastEditTime: 2019-04-17 11:35:21
 * @Description: file content
 */
const getLoginState = function (state) {
  return state.userDialogState
}
const getIsVip = function (state) {
  return state.isVip
}
const getUsername = function (state) {
  return state.username
}
const getUserIconUrl = function (state) {
  return state.userIconUrl
}
const getisActivate = function (state) {
  return state.isActivate
}
export default {
  getLoginState,
  getIsVip,
  getUsername,
  getUserIconUrl,
  getisActivate
}
