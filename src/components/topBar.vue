<!--
 * @Author: majiaao
 * @Date: 2019-01-05 18:18:24
 * @LastEditors: majiaao
 * @LastEditTime: 2019-04-03 09:00:20
 * @Description: file content
 -->
<template>
  <div class="app theme-background-color page flex-row-y-center">
    <div class="company-detail flex-row-y-center">
      <img class="company-icon" src="../assets/compony_icon.png">
      <div class="company-title" v-on:click="handleCommand('homePage')">懂球吗</div>
    </div>
    <div class="switch-bar" v-on:click="catchSwitchTab">
      <router-link to="/home">
        <span v-bind:class="currentIndex==0?'switch-item-active':'switch-item'" id="0">首页</span>
      </router-link>
      <router-link to="/data/dataSearch">
        <span v-bind:class="currentIndex==1?'switch-item-active':'switch-item'" id="1">数据</span>
      </router-link>
      <router-link to="/forum">
        <span v-bind:class="currentIndex==2?'switch-item-active':'switch-item'" id="2">球迷圈</span>
      </router-link>
      <router-link to="/home">
        <span v-bind:class="currentIndex==3?'switch-item-active':'switch-item'" id="3">官方新闻</span>
      </router-link>
    </div>
    <div class="tab-bar-search">
       <el-autocomplete class="data-search"
                prefix-icon="el-icon-search"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                placeholder="点击立即搜索"
                v-model="userSearch"
                v-on:blur="searchInputLostBlur">
          <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="type">{{ item.type }}</span>
          </template>
      </el-autocomplete>
    </div>
    <div class="user-area">
      <div class="user-unLogin flex-row" v-if="!isLogin" v-on:click="changeDialogStateBox">
        <div class="user-operation-btn" id="0">登录</div>
        <div class="user-operation-btn">|</div>
        <div class="user-operation-btn" id="1">注册</div>
      </div>
      <el-dropdown v-else @command="handleCommand">
        <div class="user-login flex-row-y-center" v-on:hover="actionUserSetting">
          <img class="user-topbar-icon" :src="userIconUrl">
          <img
            class="state-arrow"
            v-bind:src="userSettingShow == false?require('../assets/pull_down.png'):require('../assets/pack_up.png')"
          >
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="usercenter" class="drop-item">{{userName}}</el-dropdown-item>
          <el-dropdown-item command="usercenter" class="drop-item">用户中心</el-dropdown-item>
          <el-dropdown-item command="changeInfo" class="drop-item">修改信息</el-dropdown-item>
          <el-dropdown-item command="logout" class="drop-item">
            退出登陆<i class="el-icon-caret-right"></i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  components: {},
  props: {},
  data () {
    return {
      currentIndex: 0,
      userSettingShow: false,
      userSearch: undefined
    }
  },
  watch: {},
  computed: {
    ...mapState(['isLogin', 'userName', 'userIconUrl'])
  },
  methods: {
    ...mapMutations(['CHANGE_LOGIN_DIALOG_STATE']),
    ...mapActions(['changeDialogState', 'logout']),
    toast () {
      this.$notify({
        title: '成功',
        message: '账号退出成功',
        type: 'success'
      })
      this.logout()
      this.$router.push('/home')
    },
    catchSwitchTab (ev) {
      this.currentIndex = ev.target.id
    },
    changeDialogStateBox (ev) {
      const currentIndex = ev.target.id
      this.$store.commit('CHANGE_LOGIN_DIALOG_STATE', {
        currentIndex: currentIndex
      })
    },
    actionUserSetting () {
      this.userSettingShow = !this.userSettingShow
    },
    actionLogout () {},
    actionToLogin () {},
    handleCommand (command) {
      switch (command) {
        case 'usercenter':
          this.$router.push('/userCenter')
          break
        case 'changeInfo':
          this.$router.push('/userChangeInfo')
          break
        case 'logout':
          this.toast()
          break
        case 'homePage':
          this.$router.push('/home')
          break
      }
    },
    querySearchAsync (queryString, callback) {
      let list = []
      this.$http.post('/api/search', {
        searchQuery: this.userSearch
      }).then((res) => {
        res.data.team.forEach(element => {
          element.value = element.name
          list.push(element)
        })
        callback(list)
      })
    },
    handleSelect (item) {
      console.log(item)
      if (item.type == 'team') {
        this.$router.push({
          path: '/data/team',
          query: {
            teamName: item.value
          }
        })
      }
    },
    searchInputLostBlur () {
      this.userSearch = ''
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
.app {
  width: 100vw;
  height: 80px;
  position: relative;
  background-color: rgb(82, 173, 75);
  box-shadow: 0 0 30px #cccccc;
}
.company-detail {
  margin-left: 10vw;
  cursor: pointer;
}
.company-title {
  color: white;
  font-size: 30px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
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
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.switch-item-active {
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  background-color: white;
  color: rgb(82, 173, 75);
  cursor: pointer;
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
  cursor: pointer;
}
.state-arrow {
  width: 20px;
  height: 20px;
}
.drop-item:hover {
  background-color: rgb(82, 173, 75);
  color: white;
}
.tab-bar-search {
  margin-left: 18%;
}
</style>
