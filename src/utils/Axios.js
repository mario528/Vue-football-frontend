/*
 * @Author: majiaao
 * @Date: 2019-01-14 18:59:12
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-19 14:45:27
 * @Description: file content
 */
import axios from 'axios'
axios.defaults.timeout = 10000 // 设置请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post设置请求头
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      }).then((res) => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then((res) => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
