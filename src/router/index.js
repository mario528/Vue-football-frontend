/*
 * @Author: majiaao
 * @Date: 2018-12-31 22:40:41
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-26 17:12:13
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import userCenter from '@/components/user/userCenter'
import userChangeInfo from '@/components/user/userChangeInfo'
import notFound from '@/components/page/notFound'
import home from '@/components/page/home'
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
      component: userCenter,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/userChangeInfo',
      component: userChangeInfo,
      meta: {
        needLogin: true
      }
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
