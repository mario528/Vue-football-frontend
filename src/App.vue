<!--
 * @Author: majiaao
 * @Date: 2018-12-31 22:10:44
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-05 18:17:35
 * @Description: file content
 -->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
