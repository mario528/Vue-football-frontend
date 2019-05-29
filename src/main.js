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
import VueaMap from 'vue-amap'
import VueCookies from 'vue-cookies'
import socketio from 'socket.io-client'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueaMap)
Vue.use(VueCookies)
// Vue.use(VueSocketio, socketio('http://localhost:3000'));
VueaMap.initAMapApiLoader({
  key: '179d2d0c7adc342a9b5f9470d6dabafb',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0',
  v: '1.4.4'
})
const socket = socketio('http://localhost:3000');
Vue.prototype.$socket = socket
socket.on('connect',function() {
  console.log('链接成功')
})
socket.on('returnMsg',function(data) {
  Vue.prototype.$message({
    type: "success",
    message: data
 });
  console.log(data)
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
