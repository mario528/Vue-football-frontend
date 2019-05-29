<template>
  <div class="app flex-column-x-center">
    <div class="froum-main flex-column-x-center">
      <div class="forum-page-title flex-row-space-between">
        <div class="forum-title">{{content[0].forumTitle}}</div>
        <div class="flex-row-y-center forum-title-right">
          <div class="forum-title-btn" v-on:click="actionOnlyPublisher">只看楼主</div>
          <div
            class="forum-title-btn"
            v-on:click="collectForum"
          >{{isCollection == true ? '已收藏' : '收藏'}}</div>
          <div class="forum-title-btn flex-row-y-center">
            <img src="../../assets/reply_icon.png" class="forum-title-btn-img">
            回复
          </div>
        </div>
      </div>
      <div class="forum-page-content">
        <div
          class="forum-page-content-item flex-row"
          v-for="(item,index) in content"
          v-bind:key="index"
        >
          <div class="item-left flex-column-x-center">
            <div class="user-flag" v-if="item.type == 0"></div>
            <div class="user-flag-text" v-if="item.type == 0">楼主</div>
            <div
              class="user-icon-border flex-column-center"
              :id="index"
              v-on:mouseover="mouseover"
              v-on:mouseleave="mouseLeave"
            >
              <div class="user-detail flex-column" v-if="item.isShow">
                <img src="../../assets/beijing_banner.jpg" class="detail-banner">
                <div class="flex-row detail-btn-view">
                   <div
                      v-on:click="actionAttention"
                      class="attention-btn"
                      :data-followName="item.jordansw"
                    >关注</div>
                     <div
                      v-on:click="actionSendMessage"
                      class="attention-btn"
                      :data-followName="item.jordansw"
                      :data-jordansw="item.jordansw"
                    >私信</div>
                </div>
                <div class="flex-row-space-around">
                  <img :src="item.userIcon" class="user-detail-icon">
                  <div class="flex-column-center">
                    <div class="user-detail-name" v-on:click="actionToUserCenter(item.jordansw)">{{item.jordansw}}</div>
                  </div>
                </div>
              </div>
              <img :src="item.userIcon" class="user-icon">
            </div>
            <div class="user-name">{{item.jordansw}}</div>
          </div>
          <div class="item-right">
            <div class="item-content">{{item.forumContent}}</div>
            <div class="item-footer flex-row-end-y-center">
              {{index + 1}}楼
              <div class="item-time">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="forum-publish">
        <div class="flex-row-y-center forum-publish-title-area">
          <img src="../../assets/publish.png" class="publish-icon">
          <span class="forum-publish-title-span">发表回复</span>
        </div>
        <el-input
          class="forum-publish-textarea"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20}"
          placeholder="发贴请遵守发帖规则，严禁发布各类虚假欺诈信息"
          v-model="forumContent"
        ></el-input>
        <el-button type="success" class="forum-publish-btn" v-on:click="actionToPublish">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { clearInterval } from "timers";
export default {
  name: "forumPage",
  components: {},
  props: {},
  data() {
    return {
      content: [],
      isCollection: false,
      timer: null
    };
  },
  watch: {},
  computed: {
    ...mapState(["isLogin", "userName", "userIconUrl"])
  },
  methods: {
    fetchForumData() {
      this.$http
        .post("/api/forum/forumPage", {
          pageId: this.pageId,
          forumName: this.forumName,
          userName: this.userName
        })
        .then(res => {
          const data = res.data.data.data;
          this.content = data.content;
          this.isCollection = res.data.data.isCollection;
          this.content.forEach(element => {
            this.$set(element, "isShow", false);
          });
        });
    },
    actionToPublish() {
      this.$http
        .post("/api/forum/reply", {
          pageId: this.pageId,
          forumName: this.forumName,
          forumContent: this.forumContent,
          jordansw: this.userName,
          userIcon: this.userIconUrl,
          type: this.content[0].jordansw == this.userName ? 0 : 1
        })
        .then(res => {
          const status = res.data.status;
          if (status) {
            this.clearInput();
            this.$message({
              message: `回复成功`,
              type: "success"
            });
            this.fetchForumData();
          }
        });
    },
    clearInput() {
      this.forumContent = "";
      this.forumTitle = "";
    },
    actionOnlyPublisher() {},
    collectForum() {
      if (this.isCollection == true) {
        return;
      }
      this.$http
        .post("/api/forum/collection", {
          userName: this.userName,
          forumName: this.forumName,
          pageId: this.pageId
        })
        .then(res => {
          if (res.data.state == true) {
            this.isCollection = true;
          }
        });
    },
    mouseover(ev) {
      const index = ev.currentTarget.id;
      this.content[Number(index)].isShow = true;
    },
    mouseLeave(ev) {
      const index = ev.currentTarget.id;
      this.content[Number(index)].isShow = false;
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    actionAttention(ev) {
      const followName = ev.currentTarget.dataset.followname;
      this.$http
        .post("/api/user/attention", {
          followerName: followName,
          beFollowedName: this.userName
        })
        .then(res => {});
    },
    actionToUserCenter(userName) {
      this.$router.push({
        path: '/userCenter',
        query: {
          fromPage: 'forumPage',
          userName: userName
        }
      })
    },
    actionSendMessage(ev) {
      const jordansw = ev.currentTarget.dataset.jordansw;
      this.$router.push({
        path: '/user/chat',
        query: {
          userName: this.userName,
          jordansw: jordansw
        }
      })
    }
  },
  created() {
    this.pageId = this.$route.query.forumId;
    this.forumName = this.$route.query.forumName;
    this.fetchForumData();
  },
  mounted() {
    this.timer = setInterval(() => {}, 1000);
  }
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
}
.froum-main {
  width: 60vw;
  height: auto;
  margin-top: 60px;
}
.forum-page-title {
  width: 100%;
  border-bottom: 1px solid #333333;
}
.forum-title {
  font-size: 16px;
  color: #333333;
  padding: 20px 40px;
}
.forum-title-right {
  float: right;
}
.forum-title-btn {
  padding: 5px 10px;
  margin-right: 10px;
  border: 1px solid #eeeeee;
  cursor: pointer;
  border-radius: 5px;
}
.forum-title-btn-img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.forum-page-content {
  width: 100%;
}
.forum-page-content-item {
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}
.item-left {
  width: 20%;
  height: auto;
  background-color: #fbfbfd;
  position: relative;
}
.item-right {
  width: 80%;
  height: auto;
  position: relative;
}
.user-icon-border {
  width: 90px;
  height: 90px;
  background-color: rgba(128, 128, 128, 0.1);
  margin-top: 30px;
}
.user-icon {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.user-name {
  margin-top: 20px;
  margin-bottom: 20px;
}
.user-flag {
  width: 0px;
  height: 0px;
  position: absolute;
  top: -5px;
  right: -20px;
  border-top: 30px solid rgb(82, 173, 75);
  border-right: 30px solid transparent;
  border-left: 30px solid transparent;
  transform: rotate(225deg);
}
.user-flag-text {
  position: absolute;
  color: #ffffff;
  transform: rotate(45deg);
  top: 5px;
  right: 0;
  font-weight: 500;
}
.item-content {
  margin-top: 30px;
  margin-left: 30px;
  width: 90%;
  font-size: 14px;
  line-height: 20px;
}
.item-footer {
  width: 95%;
  font-size: 12px;
  color: #999999;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.item-time {
  margin-left: 20px;
}
.forum-publish {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
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
.forum-publish-title-area {
  width: 100%;
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: rgb(82, 173, 75) 2px solid;
}
.forum-publish-btn {
  text-align: center;
  margin-top: 20px;
}
.forum-publish-textarea {
  margin-top: 20px;
}
.user-detail {
  width: 150%;
  height: 150px;
  position: absolute;
  top: -120px;
  left: -25%;
  background-color: whitesmoke;
  z-index: 200;
}
.user-detail-icon {
  border: 2px solid white;
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  position: absolute;
  top: 20%;
  left: 5px;

}
.user-detail-name {
  font-size: 14px;
  padding: 5px 0px;
  margin: 5px;
  cursor: pointer;
}
.attention-btn {
  padding: 2px 10px;
  border: 1px solid rgb(82, 173, 75);
  background-color: rgb(82, 173, 75);
  color: white;
  font-weight: 500;
  cursor: pointer;
  margin-left:10px; 
}
.detail-banner {
  width: 100%;
  height: 50%;
}
.detail-btn-view {
  position: absolute;
  top: 30%;
  right: 10px;
}
</style>
