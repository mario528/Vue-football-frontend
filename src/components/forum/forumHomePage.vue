<template>
  <div class="app">
    <div class="forum-input flex-row-center">
      <img src="../../assets/logo_pron.png" class="forum-icon">
      <el-autocomplete
        type="text"
        class="forum-home-input"
        prefix-icon="el-icon-search"
        :fetch-suggestions="querySearchAsync"
        @select="actionForumPage"
        placeholder="请输入您要查询的球迷圈"
        v-model="userInput"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
      </el-autocomplete>
      <button class="forum-search-btn" v-on:click="actionForumPage">查询</button>
    </div>
    <div class="forum-user-place">
      <div class="forum-user-title flex-row-y-center">
        <img :src="userIconUrl" class="user-icon">
        <div class="user-title" v-on:click="actionUserCenter">
          <span class="user-name">用户名:{{userName}}</span>
        </div>
      </div>
      <div class="forum-user">
        <div class="forum-title">我关注的球迷圈</div>
        <div
          v-for="(item,index) in forumList"
          v-bind:key="index"
          class="forum-user-item flex-row-y-center"
          v-on:click="actionForumPageByName(item)"
        >
          {{item}}
          <img src="../../assets/star_green.png" class="forum-icon-star">
        </div>
        <div v-if="forumList.length == 0" class="no-forum-list">您暂时还未关注任何球队的球迷圈哦，去加入一个吧</div>
      </div>
    </div>
    <div class="forum-content"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'InputComponentName',
  components: {},
  props: {},
  data () {
    return {
      forumList: [],
      userInput: '',
      hasResult: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['isLogin', 'userName', 'userIconUrl']),
    ...mapGetters(['getUsername'])
  },
  methods: {
    fetchForumData () {
      this.$http
        .post('/api/forum/home', {
          userName: this.userName
        })
        .then(res => {
          const data = res.data.data
          this.forumList = data.userInfo.favForumList
        })
    },
    querySearchAsync (queryString, callback) {
      let arr = []
      this.$http
        .post('/api/forum/search', {
          search_query: this.userInput
        })
        .then((res) => {
          if (res.data.msg) {
            this.hasResult = false
          } else {
            this.hasResult = true
          }
          res.data.searchRes.forEach(element => {
            element.value = element.forumName
            arr.push(element)
          })
          callback(arr)
        })
    },
    actionUserCenter () {
      this.$router.push({
        path: '/userCenter'
      })
    },
    actionForumPage () {
      this.$router.push({
        path: '/forum/home',
        query: {
          forumName: this.userInput
        }
      })
    },
    actionForumPageByName (forumName) {
      console.log(forumName)
      this.$router.push({
        path: '/forum/home',
        query: {
          forumName: forumName
        }
      })
    }
  },
  created () {},
  mounted () {
    this.fetchForumData()
  }
}
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/forum_bg.jpeg');
  background-size: 100% 100%;
  /* background-image: url('http://www.fcguoan.com/data/slide/20190301sfyjdy.jpg');
  background-size: 100% 100%; */
}
.forum-input {
  width: 90vw;
  margin-top: 60px;
}
.forum-home-input {
  width: 40vw;
  height: 40px;
  margin-left: 30px;
  border: none;
  background-color: #eeeeee;
}
.forum-search-btn {
  width: 6vw;
  height: 40px;
  color: white;
  font-weight: 500;
  background-color: rgb(82, 173, 75);
  border: none;
}
.forum-user-title {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
}
.forum-title {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
}
.forum-icon {
  width: 120px;
  height: 40px;
}
.forum-user-place {
  width: 20vw;
  height: auto;
  margin-left: 5vw;
  margin-top: 30px;
  float: left;
  border: 1px solid red;
  background-color: white;
}
.user-icon {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
.user-name {
  font-size: 18px;
  color: rgb(82, 173, 75);
  font-weight: 500;
  margin-left: 20px;
}
.forum-user-item {
  width: 8vw;
  padding: 10px 0px;
  margin-left: 1vw;
  margin-top: 10px;
  border: 1px solid #eeeeee;
  text-align: start;
  display: inline-block;
  border-radius: 5px;
}
.forum-user {
  padding-bottom: 30px;
}
.forum-content {
  width: 46vw;
  height: 500px;
  float: left;
  margin-top: 30px;
  margin-left: 30px;
  border: 1px solid black;
}
.forum-icon-star {
  width: 16px;
  height: 16px;
}
.no-forum-list {
  width: 80%;
  margin-left: 10%;
  text-align: center;
  font-size: 12px;
  color: gray;
  padding-top: 20px;
}
</style>
