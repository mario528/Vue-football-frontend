/*
 * @Author: majiaao
 * @Date: 2018-12-31 22:40:41
 * @LastEditors: majiaao
 * @LastEditTime: 2019-03-22 11:17:05
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import userCenter from '@/components/user/userCenter'
import userChangeInfo from '@/components/user/userChangeInfo'
import notFound from '@/components/page/notFound'
import home from '@/components/page/home'
import dataSearch from '@/components/page/dataPage/dataSearch'
import teamPage from '@/components/page/dataPage/teamPage'
import teamDataCharts from '@/components/page/dataPage/teamDataCharts'
import forum from '@/components/forum/forumHomePage'
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
        needLogin: true,
        title: '用户中心'
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
      path: '/data/bi',
      component: teamDataCharts
    },
    {
      path: '/data/dataSearch',
      component: dataSearch
    },
    {
      path: '/data/team',
      name: teamPage,
      component: teamPage
    },
    {
      path: '/forum',
      name: forum,
      component: forum
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
