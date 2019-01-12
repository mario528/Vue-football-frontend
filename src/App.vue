<template>
  <div id="app">
    <top-bar></top-bar>
    <login-or-register></login-or-register>
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
  overflow: hidden;
}
a {
  text-decoration: none;
}
</style>
