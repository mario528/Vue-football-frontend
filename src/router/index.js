/*
 * @Author: majiaao
 * @Date: 2018-12-31 22:40:41
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-19 17:04:01
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import userCenter from '@/components/user/userCenter'
import userChangeInfo from '@/components/user/userChangeInfo'
import notFound from '@/components/common/notFound'
import home from '@/components/common/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/userCenter',
      component: userCenter
    },
    {
      path: '/userChangeInfo',
      component: userChangeInfo
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
