<template>
  <div class="app flex-column-x-center">
    <div class="no-such-forum flex-column-center" v-if="noForum">
      <div class="no-such-forum-title">抱歉，暂无该球迷圈，点击立即成为该论坛的发起人吧</div>
      <img src="../../assets/not_found.jpg" class="sorry-icon" v-on:click="actionToFoundForum">
    </div>
    <div class="forum-main" v-if="!noForum">
      <div class="forum-title flex-row-y-center">
        <div class="forumIcon">
          <img :src="forumInfo.forumIcon">
        </div>
        <div class="flex-column forum-title-content">
          <div class="flex-row-y-center">
            <div class="forum-name flex-row-y-center">{{searchForum}}吧</div>
            <div class="forum-state flex-row-y-center">
              <div v-if="isFollower" class="forum-state-islike" v-on:click="actionUnfollow">
                <span class="forum-state-font">
                  <img src="../../assets/hasFollowed.png" class="hasFollowed-icon">已关注
                </span>
                <span class="forum-state-font">|</span>
                <span class="forum-state-font">取消关注</span>
              </div>
              <div v-if="!isFollower" class="forum-state-unlike" v-on:click="actionToFollow">+ 关注</div>
            </div>
            <div class="followers flex-row-y-center">关注者:{{forumInfo.forumFollowerNum}}人</div>
          </div>
          <div class="flex-row-y-center forum-introduce">
            <div>
              <span>{{forumInfo.forumIntroduce}}</span>
            </div>
            <div class="forum-tabs">
              <el-tag
                v-for="(item,index) in forumInfo.forumTabs"
                v-bind:key="index"
                type="success"
                class="forum-tabs-item"
              >{{item}}</el-tag>
            </div>
          </div>
        </div>
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
                <div class="reply-num">{{item.content.length}}</div>
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
          <div class="no-invitation flex-column-x-center" v-if="invitation.length == 0">
            <img src="../../assets/no_result.png" class="forum-big-icon">
            暂无帖子哦，快去发第一个吧
          </div>
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
            <div class="forum-about-title">贴吧分类</div>
            <div class="forum-mine" style="margin-left:5px;">
              <el-tag
                style="margin-right:5px; margin-bottom:10px;"
                v-for="(item,index) in suggestForumType"
                :key="index"
                type="success"
                v-on:click.native="actionJumpForumList(item)"
              >{{item}}</el-tag>
            </div>
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
import { mapState } from "vuex";
export default {
  name: "forumHomePage",
  components: {},
  props: {},
  data() {
    return {
      searchForum: "",
      forumInfo: undefined,
      invitation: [],
      isFollower: false,
      forumTitle: "",
      forumContent: "",
      titleTips: false,
      noForum: true,
      suggestForumType: []
    };
  },
  watch: {},
  computed: {
    ...mapState(["userName", "userIconUrl", "isVip"])
  },
  methods: {
    actionToFoundForum() {
      this.$router.push({
        path: "/forum/found",
        query: {
          forumName: this.searchForum
        }
      });
    },
    fetchForumHomePage() {
      this.$http
        .post("/api/forum/forumHome", {
          forumName: this.searchForum,
          userName: this.userName
        })
        .then(res => {
          if (res.data.state == false) {
            this.noForum = true;
          } else {
            this.noForum = false;
            const data = res.data.data;
            this.forumInfo = data.forumInfo;
            this.invitation = data.invitation;
            this.isFollower = data.isFollower;
            this.suggestForumType = data.suggest_forum_type;
          }
        });
    },
    actionToFollow() {
      const that = this;
      this.$http
        .post("/api/forum/join", {
          userName: this.userName,
          forumName: this.searchForum
        })
        .then(res => {
          const status = res.data.data.status;
          if (status == true) {
            that.isFollower = true;
          } else {
          }
        })
        .then(() => {
          this.fetchForumHomePage();
        });
    },
    actionToPublish() {
      if (this.forumTitle == "") {
        this.titleTips = true;
        return;
      }
      this.$http
        .post("/api/forum/publish", {
          userName: this.userName,
          userIcon: this.userIconUrl,
          forumName: this.searchForum,
          forumTitle: this.forumTitle,
          forumContent: this.forumContent,
          type: 0 // 0: 发帖人 1: 回帖人
        })
        .then(res => {
          this.clearAllInput();
          const state = res.data.data.state;
          if (state == true) {
            this.fetchForumHomePage();
          }
        });
    },
    actionReplyForum(id) {
      this.$router.push({
        path: "/forum/page",
        query: {
          forumId: id,
          forumName: this.searchForum
        }
      });
    },
    clearAllInput() {
      this.forumTitle = "";
      this.forumContent = "";
    },
    actionUnfollow() {
      this.$http
        .post("/api/forum/unfollow", {
          userName: this.userName,
          forumName: this.searchForum
        })
        .then(res => {
          const status = res.data.status;
          if (status == true) this.isFollower = false;
        })
        .then(() => {
          this.fetchForumHomePage();
        });
    },
    actionJumpForumList(type) {
      this.$router.push({
        path: "/forum/type",
        query: {
          type: type
        }
      });
    }
  },
  created() {
    this.searchForum = this.$route.query.forumName;
    this.fetchForumHomePage();
  },
  mounted() {}
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
  position: relative;
}
.no-such-forum {
  width: 100vw;
  height: calc(100vh - 80px);
  border-top: 5px solid white;
  background-color: black;
}
.no-such-forum-title {
  font-size: 20px;
  font-weight: 500;
  padding: 50px 0px;
  color: white;
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
}
.forum-title-content {
  margin-left: 3vw;
  margin-top: calc(8vw - 20px);
}
.forum-state {
  margin-left: 20px;
}
.forum-state-islike {
  color: white;
  background-color: rgb(82, 173, 75);
  padding: 5px;
  cursor: pointer;
}
.forum-state-islike:hover {
  color: white;
  background-color: rgba(82, 173, 75, 0.7);
  padding: 5px;
  cursor: pointer;
}
.forum-state-unlike {
  color: white;
  padding: 5px;
  font-size: 16px;
  background-color: rgb(82, 173, 75);
  cursor: pointer;
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
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-image: url("../../assets/reply.png");
  background-size: 30px 30px;
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
  width: calc(45vw - 10px);
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}
.hasFollowed-icon {
  width: 15px;
  height: 15px;
  padding: 0px 5px;
}
.forum-state-font {
  font-size: 16px;
  padding: 5px;
}
.forumIcon {
  width: 120px;
  height: 120px;
  border: 5px solid rgba(82, 173, 75, 0.6);
  border-radius: 10px;
  margin-left: 5vw;
  margin-top: 5vw;
}
.forumIcon img {
  width: 120px;
  height: 120px;
}
.forum-introduce {
  font-size: 16px;
  color: #2d64b3;
  padding-top: 10px;
}
.forum-tabs-item {
  margin: 0px 10px 0px 10px;
  padding: 0px 20px;
}
.forum-big-icon {
  width: 40px;
  height: 40px;
  padding: 20px 0px;
}
</style>
