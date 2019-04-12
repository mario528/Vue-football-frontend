<template>
  <div id="app">
    <top-bar v-if="showTopBar"></top-bar>
    <login-or-register></login-or-register>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/topBar'
import LoginOrRegister from '@/components/user/loginOrRegister'

export default {
  name: 'App',
  components: {
    TopBar,
    LoginOrRegister
  },
  data () {
    return {
      showTopBar: true
    }
  },
  watch: {
    $route: function (ev) {
      const routerPath = ev.path
      if (routerPath === '/data/bi') {
        this.showTopBar = false
      } else {
        this.showTopBar = true
      }
    }
  }
}
</script>

<style>
.app {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a {
  text-decoration: none;
}
</style>
