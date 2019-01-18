/*
 * @Author: majiaao
 * @Date: 2019-01-14 18:59:12
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-15 11:41:07
 * @Description: file content
 */
import axios from 'axios'
axios.defaults.timeout = 10000 // 设置请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post设置请求头
export function get (url, parmars) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      parmars
    }).then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error.data)
    })
  })
}
export function post (url, parmars) {
  return new Promise((resolve, reject) => {
    axios.post(url, parmars).then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error.data)
    })
  })
}
