<!--
 * @Author: majiaao
 * @Date: 2019-01-05 18:18:24
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-12 15:45:26
 * @Description: file content
 -->
<template>
  <div class="app theme-background-color page flex-row-y-center">
      <div class="company-detail flex-row-y-center">
        <img class="company-icon" src="../assets/compony_icon.png"/>
        <div class="company-title">懂球帝</div>
      </div>
      <div class="switch-bar" v-on:click="catchSwitchTab">
        <router-link to="/home">
          <span v-bind:class="currentIndex==0?'switch-item-active':'switch-item'" id="0">首页</span>
        </router-link>
        <router-link to="/home">
          <span v-bind:class="currentIndex==1?'switch-item-active':'switch-item'" id="1">数据</span>
        </router-link>
        <router-link to="/home">
          <span v-bind:class="currentIndex==2?'switch-item-active':'switch-item'" id="2">球迷圈</span>
        </router-link>
         <router-link to="/home">
          <span v-bind:class="currentIndex==3?'switch-item-active':'switch-item'" id="3">官方新闻</span>
        </router-link>
      </div>
      <div class="user-area">
        <div class="user-unLogin flex-row" v-if="!isLogin" v-on:click="actionToLogin">
          <div class="user-operation-btn">登录</div>
          <div class="user-operation-btn">|</div>
          <div class="user-operation-btn">注册</div>
        </div>
        <div class="user-login flex-row-y-center" v-else
             v-on:click="actionUserSetting">
          <img class="user-topbar-icon" src="../assets/user-icon-test.png" />
          <img class="state-arrow" v-bind:src="userSettingShow == false?require('../assets/pull_down.png'):require('../assets/pack_up.png')">
        </div>
          <div class="user-setting-area"
               v-if="userSettingShow">
               <div class="user-setting-item flex-row">个人中心</div>
               <div class="user-setting-item flex-row">消息</div>
               <div class="user-setting-item flex-row-y-center">
                 退出
                 <img class="user-setting-item-icon" src="../assets/check_out.png" />
               </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  components: {
  },
  props: {},
  data () {
    return {
      currentIndex: 0,
      isLogin: false,
      userSettingShow: false
    }
  },
  watch: {},
  computed: {
  },
  methods: {
    catchSwitchTab (ev) {
      this.currentIndex = ev.target.id
    },
    actionUserSetting () {
      this.userSettingShow = !this.userSettingShow
    },
    actionToLogin () {}
  },
  created () {},
  mounted () {
  }
}
</script>
<style scoped>
.app {
  width: 100vw;
  height: 80px;
  position: relative;
}
.company-detail {
  margin-left: 10vw;
}
.company-title {
  color: white;
  font-size: 30px;
  font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
  margin-left: 5px;
  font-weight: 600;
}
.company-icon {
  width: 60px;
  height: 60px;
}
.switch-bar {
  margin-left: 10vw;
}
.switch-item {
  color: white;
  background-color: rgb(82, 173, 75);
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  font-size: 25px;
  font-weight: 500;
}
.switch-item-active {
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 25px;
  font-weight: 500;
  background-color: white;
  color: rgb(82, 173, 75);
}
.switch-item:hover {
  border-radius: 10px;
  background-color: white;
  color: rgb(82, 173, 75);
}
.user-area {
  height: auto;
  position: absolute;
  right: 5vw;
}
.user-topbar-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-operation-btn {
  font-size: 14px;
  color: white;
  margin-left: 5px;
  font-weight: 500;
}
.user-setting-area {
  width: 80px;
  color: rgb(82, 173, 75);
  font-weight: 500;
  background-color:white;
  border-bottom: 1px solid white;
  position: absolute;
  top: 35px;
}
.user-setting-item {
  padding: 10px 0 10px 0;
}
.user-setting-item-icon {
  widows: 20px;
  height: 20px;
}
.state-arrow {
  width: 20px;
  height: 20px;
}
</style>
