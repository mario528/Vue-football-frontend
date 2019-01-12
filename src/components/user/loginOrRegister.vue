<template>
  <div v-if="dialogShow">
      <div class="container popup-menu flex-row-center">
          <div class="card-place" v-if="state == 0">
              <img v-bind:src="iconShow" class="animal-icon"/>
              <div class="flex-row-space-between menu-title">
                    <span class="menu-title-text">登录</span>
                    <img  class="menu-close" src="../../assets/close_common.png" v-on:click="closeDialog"/>
              </div>
              <div class="card-input flex-column">
                  <input class="user-input" placeholder="请输入用户名或手机号" v-model="userName" 
                         v-on:focus="userNameFocus" v-on:blur="userBlur"/>
                  <input type="password" class="user-input" placeholder="请输入密码" v-model="password"
                         v-on:focus="passwordFocus" v-on:blur="userBlur"/>
                  <button class="card-btn theme-background-color">登陆</button>
              </div>
              <div class="card-bottom flex-row-space-between">
                 <div>没有账号？<span class="bottom-text" v-on:click="actionToRegister">注册</span></div>
                 <span class="bottom-text">忘记密码</span>
              </div>
          </div>
          <div class="card-place" v-else>
               <div class="flex-row-space-between menu-title">
                    <span class="menu-title">注册</span>
                    <img  class="menu-close" src="../../assets/close_common.png" v-on:click="closeDialog"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import animalIconCommon from '../../assets/common_login_icon.png'
import animalIconActive from '../../assets/common_login_active.png'
import animalIconPassword from '../../assets/common_login_password.png'
export default {
  name: 'LoginOrRegister',
  components: {},
  props: {},
  data () {
    return {
      state: 0, // 0: 登录 1: 注册
      dialogShow: true,
      iconShow: animalIconCommon,
      userName: undefined,
      password: undefined,
    //   inputState: 0 // 0:animalIconCommon 1:animalIconActive 2: animalIconPassword
    }
  },
  watch: {
  },
  computed: {},
  methods: {
      userNameFocus() {
          this.iconShow = animalIconActive
      },
      userBlur() {
          this.iconShow = animalIconCommon
      },
      passwordFocus() {
          this.iconShow = animalIconPassword
      },
      closeDialog() {
          this.dialogShow = false
      },
      actionToRegister() {
          this.state = 1
      }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
.popup-menu {
    background-color: rgba(0,0,0,.3);;
    padding: 0px;
    margin: 0px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
}
.card-place {
    width: 30vw;
    height: 45vh;
    min-width: 300px;
    position: relative;
    background-color: white;
}
.menu-close {
    width: 10px;
    height: 10px;
}
.menu-title {
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
    align-items: center;
}
.menu-title-text {
    font-size: 16px;
    font-weight: 500;
}
.animal-icon {
    position: absolute;
    width: 80px;
    height: 80px;
    top: -60px;
    left: calc(10vw);
}
.card-input {
    width: 80%;
    margin-left: 10%;
}
.user-input {
    width: 100%;
    height: 30px;
    margin-top: 10px;
}
.card-btn {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    color: white;
    font-size: 11px;
    font-weight: 500;
}
.card-bottom {
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
}
.bottom-text {
    color: rgb(82, 173, 75);
}
</style>
