<!--
 * @Author: majiaao
 * @Date: 2019-01-12 18:40:54
 * @LastEditors: majiaao
 * @LastEditTime: 2019-01-26 01:21:43
 * @Description: file content
 -->
<template>
  <div v-if="getLoginState">
    <div class="container popup-menu flex-row-center">
      <div class="card-place" v-if="userDialogNum == 0">
        <img v-bind:src="iconShow" class="animal-icon">
        <div class="flex-row-space-between menu-title">
          <span class="menu-title-text">登录</span>
          <img
            class="menu-close"
            src="../../assets/close_common.png"
            v-on:click="changeDialogState"
          >
        </div>
        <div class="card-input flex-column">
          <input
            class="user-input"
            placeholder="请输入用户名或手机号"
            v-model="loginData.userName"
            v-on:focus="userNameFocus"
            v-on:blur="userBlur"
          >
          <input
            type="password"
            class="user-input"
            placeholder="请输入密码"
            v-model="loginData.password"
            v-on:focus="passwordFocus"
            v-on:blur="userBlur"
          >
          <button class="card-btn theme-background-color" v-on:click="actionToLogin">登陆</button>
        </div>
        <div class="card-bottom flex-row-space-between">
          <div>
            没有账号？
            <span class="bottom-text" v-on:click="changeDialogState">注册</span>
          </div>
          <span class="bottom-text">忘记密码</span>
        </div>
      </div>
      <div class="card-place" v-else>
        <div class="flex-row-space-between menu-title">
          <span class="menu-title-text">注册</span>
          <img
            class="menu-close"
            src="../../assets/close_common.png"
            v-on:click="changeDialogState"
          >
        </div>
        <div class="card-input flex-column">
          <input class="user-input" placeholder="请输入用户名" v-model="registerData.userName">
          <input class="user-input" placeholder="请输入手机号" v-model="registerData.telephone">
          <input
            type="password"
            class="user-input"
            placeholder="请输入密码"
            v-model="registerData.password"
          >
          <button class="card-btn theme-background-color" v-on:click="actionToRegister">注册</button>
          <span class="bottom-text" style="text-align: center" v-on:click="changeDialogState">已有账号登陆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

import animalIconCommon from '../../assets/common_login_icon.png'
import animalIconActive from '../../assets/common_login_active.png'
import animalIconPassword from '../../assets/common_login_password.png'

import URL from '@/utils/url.js'
import axios from '@/utils/index.js'
export default {
  name: 'LoginOrRegister',
  components: {},
  props: [],
  data () {
    return {
      state: 0, // 0: 登录 1: 注册
      dialogShow: false,
      iconShow: animalIconCommon,
      loginData: {
        userName: undefined,
        password: undefined
      },
      registerData: {
        userName: undefined,
        password: undefined,
        telephone: undefined
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(['userDialogNum']),
    ...mapGetters(['getLoginState'])
  },
  methods: {
    ...mapActions(['changeDialogState','login','setUsername','setUserIconUrl']),
    clearAllInput () {
      const ObjArray = [this.loginData, this.registerData]
      ObjArray.forEach(element => {
        Object.keys(element).forEach((item) => {
          element[item] = ''
        })
      })
    },
    userNameFocus () {
      this.iconShow = animalIconActive
    },
    userBlur () {
      this.iconShow = animalIconCommon
    },
    passwordFocus () {
      this.iconShow = animalIconPassword
    },
    actionToLogin () {
      const that = this;
      if (this.loginData.userName === '' || this.loginData.userName === undefined) {
        this.clearAllInput()
        this.$notify.error({
          title: '',
          message: '用户名输入有误，请重新输入'
        })
      } else if (this.loginData.password === '' || this.loginData.password === undefined) {
        this.clearAllInput()
        this.$notify.error({
          title: '',
          message: '密码输入有误，请重新输入'
        })
      }
      this.$http.post('/api/login', {
        username: this.loginData.userName,
        password: this.loginData.password
      }).then((res) => {
        if(res.data.data[0].state == 1) {
          that.$message({
              message: '登陆成功',
              type: 'success'
          });
          this.setUserIconUrl(res.data.data[0].userIcon)
          this.setUsername(this.loginData.userName)
          this.changeDialogState();
          this.login();
          this.clearAllInput();
        } else if(res.data.data[0].state == -1) {
          this.$message.error('密码错误');
        } else if(res.data.data[0].state == 2) {
           this.$message.error('输入的用户名不存在');
        }
      })
    },
    // 注册模块
    actionToRegister () {
       const that = this;
       if (this.registerData.userName === '' || this.registerData.userName === undefined) {
        this.clearAllInput()
        this.$notify.error({
          title: '',
          message: '用户名输入有误，请重新输入'
        })
      } else if (this.registerData.password === '' || this.registerData.password === undefined) {
        this.clearAllInput()
        this.$notify.error({
          title: '',
          message: '密码输入有误，请重新输入'
        })
      } else if(this.registerData.telephone === '' || this.registerData.telephone === undefined) {
        this.clearAllInput()
        this.$notify.error({
          title: '',
          message: '手机号输入有误，请重新输入'
        })
      }
      this.$http.post('/api/register',{
        username: this.registerData.userName,
        password: this.registerData.password,
        telephone: this.registerData.telephone,
      }).then((res)=> {
        if(res.data[0].state == 1) {
          that.$message({
              message: '恭喜您,注册成功',
              type: 'success'
          });
        }
      })
    },
    actionSwitchTab () {
      this.loginData = {
        userName: '',
        password: ''
      }
      this.registerData = {
        userName: '',
        password: '',
        telephone: ''
      }
      this.state === 1 ? (this.state = 0) : (this.state = 1)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.popup-menu {
  background-color: rgba(0, 0, 0, 0.3);
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
  margin-top: 40px;
  align-items: center;
  height: 40px;
  border-bottom: 2px solid rgb(82, 173, 75);
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
  left: calc(10vw + 40px);
}
.card-input {
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
}
.user-input {
  width: 100%;
  height: 30px;
  margin-top: 20px;
}
.card-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  color: white;
  font-size: 11px;
  font-weight: 500;
}
.card-bottom {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.bottom-text {
  color: rgb(82, 173, 75);
  margin-top: 5px;
}
</style>
