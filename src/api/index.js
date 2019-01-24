/*
 * @Author: majiaao
 * @Date: 2019-01-19 15:04:00
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-19 15:17:38
 * @Description: file content
 */
import Http from './Axios'
import Url from './Url'
const baseUrl = 'http://localhost:3000'
export const userLogin = (params) => {
  return Http.fetchPost(`${baseUrl}+${Url.LOGIN}`, params)
}
export const userRegister = (params) => {
  return Http.fetchPost(`${baseUrl}+${Url.REGISTER}`, params)
}
export const userLogout = (params) => {
  return Http.fetchPost(`${baseUrl}+${Url.LOGIN}`, params)
}
export const userModificationInfomation = (params) => {
  return Http.fetchPost(`${baseUrl}+${Url.LOGIN}`, params)
}
export const userBuyVip = (params) => {
  return Http.fetchPost(`${baseUrl}+${Url.LOGIN}`, params)
}
