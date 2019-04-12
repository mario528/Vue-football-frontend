// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'

import 'lib-flexible'
import '../app.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(BaiduMap, {
  ak: 'oyZk9cTfjcLIgKhbwzeeXC8YD3T2lZCk' // 这个地方是官方提供的ak密钥
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needLogin)) { // 判断该路由是否需要登录权限
    if (store.state.isLogin) { // 判断当前用户的登录信息是否存在
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {
    App
  },
  template: '<App/>'
})
