<template>
  <div class="app flex-column-x-center">
    <div class="no-such-forum flex-column-center" v-if="noForum">
      <div class="no-such-forum-title">抱歉，暂无该球迷圈，点击立即成为该论坛的发起人吧</div>
      <img src="../../assets/sorry.png" class="sorry-icon" v-on:click="actionToFoundForum">
    </div>
    <div class="forum-main" v-if="!noForum">
      <div class="forum-title flex-row-y-center">
        <!-- <div class="forum-icon">
        </div>-->
        <div class="forum-name">{{searchForum}}吧</div>
        <div class="forum-state">
          <div v-if="isFollowers" class="forum-state-islike">已关注|取消关注</div>
          <div v-if="!isFollowers" class="forum-state-unlike" v-on:click="actionToFollow">+ 关注</div>
        </div>
        <div class="followers">关注者:{{forumInfo.forumFollowerNum}}人</div>
      </div>
      <div class="forum-content flex-row">
        <div class="flex-column forum-content-left">
          <div
            class="forum-item flex-row-y-center"
            v-for="(item,index) in  invitation"
            v-bind:key="index"
          >
            <div class="forum-item-left">
              <div class="reply-area">
                <div class="reply-num">1</div>
              </div>
            </div>
            <div class="forum-item-right">
              <div class="forum-item-line flex-row-space-between">
                <div
                  class="forum-item-title"
                  v-on:click="actionReplyForum(item.forum_id)"
                >{{item.content[0].forumTitle}}</div>
                <div class="forum-item-name flex-row-y-center">
                  <img src="../../assets/forum_user.png" class="forum-small-icon">
                  {{item.content[0].jordansw}}
                </div>
              </div>
              <div class="forum-item-line flex-row-space-between">
                <div class="forum-item-content">{{item.content[0].forumContent}}</div>
                <div class="forum-item-time flex-row-y-center">
                  <img src="../../assets/forum_dialog_box.png" class="forum-small-icon">
                  {{item.content[0].time}}
                </div>
              </div>
            </div>
          </div>
          <div class="no-invitation" v-if="invitation.length == 0">暂无帖子哦，快去发第一个吧</div>
        </div>
        <div class="flex-column forum-content-right">
          <div class="forum-about">
            <div class="forum-about-title flex-row-space-between">
              本吧信息
              <span class="forum-about-detail">查看详情>></span>
            </div>
            <div class="found-of-forum">
              <div class="found-by flex-row">
                <img :src="forumInfo.forumFollowers[0].userIcon" class="user-icon">
                <div class="found-by-title">吧主</div>
                <div class="flex-row">
                  <img src="../../assets/is_vip.png" v-if="isVip" class="vip-icon">
                  <img src="../../assets/not_vip.png" v-if="!isVip" class="vip-icon">
                  <div class="found-by-name">{{forumInfo.foundBy}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="forum-mine">
            <div class="forum-about-title">我在贴吧</div>
            <div class="forum-mine"></div>
          </div>
        </div>
      </div>
      <div class="forum-publish flex-column-x-center">
        <div class="flex-row-y-center forum-publish-title-area">
          <img src="../../assets/publish.png" class="publish-icon">
          <span class="forum-publish-title-span">发表新帖</span>
        </div>
        <el-input
          v-model="forumTitle"
          class="forum-publish-title"
          placeholder="发贴请遵守发帖规则，严禁发布各类虚假欺诈信息"
        ></el-input>
        <div class="forum-publish-title-tips" v-if="titleTips">标题不能为空</div>
        <el-input
          class="forum-publish-textarea"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20}"
          placeholder="请输入内容"
          v-model="forumContent"
        ></el-input>
        <el-button type="success" class="forum-publish-btn" v-on:click="actionToPublish">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'forumHomePage',
  components: {},
  props: {},
  data () {
    return {
      searchForum: '',
      forumInfo: undefined,
      invitation: [],
      isFollowers: false,
      forumTitle: '',
      forumContent: '',
      titleTips: false,
      noForum: true
    }
  },
  watch: {},
  computed: {
    ...mapState(['userName', 'userIconUrl', 'isVip'])
  },
  methods: {
    actionToFoundForum () {
      this.$router.push({
        path: '/forum/found',
        query: {
          forumName: this.searchForum
        }
      })
    },
    fetchForumHomePage () {
      this.$http
        .post('/api/forum/forumHome', {
          forumName: this.searchForum,
          userName: this.userName
        })
        .then(res => {
          if (res.data.state == false) {
            this.noForum = true
          } else {
            this.noForum = false
            const data = res.data.data
            this.forumInfo = data.forumInfo
            this.invitation = data.invitation
          }
        })
    },
    actionToFollow () {
      this.$http
        .post('/api/forum/join', {
          userName: this.userName,
          forumName: this.searchForum
        })
        .then(res => {
          const state = res.data.state
          if (state == true) {
            this.isFollowers = true
          } else {
          }
        })
    },
    actionToPublish () {
      if (this.forumTitle == '') {
        this.titleTips = true
        return
      }
      this.$http
        .post('/api/forum/publish', {
          userName: this.userName,
          userIcon: this.userIconUrl,
          forumName: this.searchForum,
          forumTitle: this.forumTitle,
          forumContent: this.forumContent,
          type: 0 // 0: 发帖人 1: 回帖人
        })
        .then(res => {
          this.clearAllInput()
          const state = res.data.data.state
          if (state == true) {
            this.fetchForumHomePage()
          }
        })
    },
    actionReplyForum (id) {
      this.$router.push({
        name: 'forumPage',
        params: {
          pageId: id,
          forumName: this.searchForum
        }
      })
    },
    clearAllInput () {
      this.forumTitle = ''
      this.forumContent = ''
    }
  },
  created () {
    this.searchForum = this.$route.query.forumName
    this.fetchForumHomePage()
  },
  mounted () {}
}
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
  position: relative;
}
.no-such-forum {
  width: 80vw;
}
.no-such-forum-title {
  font-size: 20px;
  font-weight: 500;
}
.forum-title {
  height: 25vh;
  background-image: url("../../assets/analysisBg.jpg");
  background-size: 100% 100%;
  border-bottom: 1px solid #eeeeee;
}
.forum-main {
  width: 70vw;
  height: auto;
  margin-top: 5vh;
  border: 1px solid black;
  background-color: #ffffff;
}
.forum-name {
  font-size: 22px;
  color: #333333;
  margin-left: 5vw;
}
.forum-state {
  margin-left: 20px;
}
.forum-state-islike {
  color: white;
  background-color: rgb(82, 173, 75);
}
.forum-state-unlike {
  color: white;
  padding: 5px;
  font-size: 16px;
  background-color: rgb(82, 173, 75);
}
.forum-content {
  height: auto;
  width: 100%;
  margin-left: 5%;
  margin-top: 30px;
  min-height: 200px;
}
.forum-content-left {
  width: 70%;
  border-right: 1px solid #eeeeee;
}
.forum-content-right {
  width: 25%;
}
.forum-item {
  margin: 10px 0px;
  width: 100%;
  position: relative;
  border-bottom: 1px dashed #eeeeee;
}
.forum-item:hover {
  background-color: rgba(45, 100, 179, 0.1);
}
.reply-area {
  position: relative;
}
.reply-icon {
  width: 40px;
  height: 40px;
}
.reply-num {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 35px;
  background-image: url("../../assets/reply.png");
  background-size: 40px 40px;
}
.followers {
  margin-left: 20px;
  font-size: 16px;
  font-weight: 500;
}
.forum-publish {
  margin-bottom: 50px;
  margin-top: 20px;
}
.forum-publish-title-area {
  width: 70%;
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: rgb(82, 173, 75) 3px solid;
}
.forum-publish-title {
  width: 70%;
  margin-top: 30px;
  margin-bottom: 10px;
}
.publish-icon {
  width: 25px;
  height: 25px;
}
.forum-publish-title-span {
  margin-left: 20px;
}
.forum-publish-content {
  margin-top: 20px;
}
.forum-publish-textarea {
  width: 70%;
}
.forum-publish-btn {
  float: left;
  margin-top: 30px;
}
.forum-publish-title-tips {
  font-size: 12px;
  color: red;
  float: left;
}
.forum-item-right {
  width: 100%;
}
.forum-item-line {
  padding: 10px 20px;
  width: calc(45vw - 10px)
}
.forum-item-title {
  color: #2d64b3;
  font-size: 14px;
}
.forum-item-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
.forum-small-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}
.user-icon {
  width: 80px;
  height: 80px;
  margin-left: 20px;
  border: 2px solid #2d64b3;
}
.found-by {
  position: relative;
  padding: 20px 0px;
}
.found-by-title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: 500;
  top: 85px;
  left: 75px;
}
.forum-about {
  border-bottom: 1px solid #eeeeee;
}
.forum-about-title {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
  margin-left: 10px;
}
.found-by-name {
  font-size: 12px;
  font-weight: 500;
  color: #2d64b3;
  display: inline-block;
  margin-left: 15%;
  margin-top: 5%;
}
.vip-icon {
  width: 20px;
  height: 20px;
  margin-left: 10%;
}
.forum-about-detail {
  font-size: 12px;
  font-weight: 500;
  color: #2d64b3;
}
.forum-mine {
  margin-top: 20px;
}
.no-invitation {
  text-align: center;
  margin-top: 50px;
}
.forum-item-content {
  overflow:hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  max-width: 70%;
}
</style>
