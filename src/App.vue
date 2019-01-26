<template>
  <div id="app">
    <top-bar></top-bar>
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
  }
}
</script>

<style>
.app {
  width: 100vw;
  background-color: rgb(224, 225, 225);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a {
  text-decoration: none;
}
</style>
