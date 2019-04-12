<template>
  <div class="app flex-column-x-center">
    <div class="froum-main flex-column-x-center">
      <div class="forum-page-title flex-row-space-between">
        <div class="forum-title">{{content[0].forumTitle}}</div>
        <div class="flex-row-y-center forum-title-right">
          <div class="forum-title-btn">只看楼主</div>
          <div class="forum-title-btn">收藏</div>
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
            <div class="user-icon-border flex-column-center">
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
export default {
  name: "forumPage",
  components: {},
  props: {},
  data() {
    return {
      content: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    fetchForumData() {
      this.$http
        .post("/api/forum/forumPage", {
          pageId: this.pageId,
          forumName: this.forumName
        })
        .then(res => {
          const data = res.data.data.data;
          this.content = data.content;
        });
    }
  },
  created() {
    this.pageId = this.$route.params.pageId;
    this.forumName = this.$route.params.forumName;
    this.fetchForumData();
  },
  mounted() {}
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
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #999999;
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
}
</style>