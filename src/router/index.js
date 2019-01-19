/*
 * @Author: majiaao
 * @Date: 2018-12-31 22:40:41
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-18 16:50:11
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import userCenter from '@/components/user/userCenter'
import userChangeInfo from '@/components/user/userChangeInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/userCenter',
      component: userCenter
    },
    {
      path: '/userChangeInfo',
      component: userChangeInfo
    }
  ]
})
