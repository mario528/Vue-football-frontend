<template>
  <div class="app flex-column-center" >
    <div class="forum-content flex-column-center" v-if="!foundSuccess">
      <div class="forum-title">创建新的球迷圈</div>
      <div class="forum-main-content">
        <el-input type="text" class="forum-input" v-model="foundForumName" disabled/>
        <div class="flex-row">
          <el-input
            placeholder="请输入验证码"
            class="found-input-verification-code"
            v-model="verificationInput"
          />
          <div v-html="verificationImg" v-on:click="getVerificationCode"></div>
        </div>
      </div>
      <div class="forum-footer">
        <el-button
          type="success"
          class="confirm-button"
          v-bind:disabled="disabledBtn"
          v-on:click="actionToFound"
        >注册</el-button>
      </div>
    </div>
    <div class="found-success" v-if="foundSuccess">
      创建成功
      {{countNum}}秒后将跳转至球迷圈首页
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'forumFound',
  components: {},
  props: {},
  data () {
    return {
      foundForumName: '',
      verificationImg: '',
      verificationText: '',
      disabledBtn: true,
      verificationInput: '',
      foundSuccess: false,
      countNum: 5
    }
  },
  watch: {
    verificationInput: function () {
      if (this.verificationInput === this.verificationText) {
        this.disabledBtn = false
      }
    }
  },
  computed: {
    ...mapState(['isLogin', 'userName', 'userIconUrl'])
  },
  methods: {
    getVerificationCode () {
      this.$http.get('/api/user/getVerificationCode').then(res => {
        const data = res.data.data
        this.verificationImg = data.svgUrl
        this.verificationText = data.svgText
      })
    },
    actionToFound () {
      const that = this
      if (this.verificationInput !== this.verificationText) {
        this.$notify.error({
          title: '',
          message: '验证吗输入有误'
        })
        this.getVerificationCode()
      }
      this.$http.post('/api/forum/found', {
        'forumName': this.foundForumName,
        'foundBy': this.userName,
        'userIcon': this.userIconUrl
      }).then((res) => {
        if (res.data.state === true) {
          that.foundSuccess = true
        }
      })
    }
  },
  created () {
    this.foundForumName = this.$route.query.forumName
    this.getVerificationCode()
  },
  mounted () {}
}
</script>
<style scoped>
.forum-content {
  width: 60vw;
  height: 50vh;
  border: 1px solid black;
  margin-top: 100px;
}
.forum-title {
  font-size: 20px;
  color: aquamarine;
}
.forum-input {
  margin: 30px 0px;
}
.forum-footer {
  margin-top: 30px;
}
.confirm-button {
  width: 20vw;
}
</style>
