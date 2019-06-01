<template>
  <div class="app flex-column-x-center">
    <div class="title">{{type}}</div>
    <div class="content flex-row">
      <div class="left">
        <div class="left-title">论坛分类</div>
        <div class="left-content">
          <div v-for="(item,index) in typeList" :key="index" class="left-content-item">
            <span  @click="changeKeyWord(item)">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="forum-content">
          <div class="forum-item flex-row-y-center" 
               v-for="(item,index) in forumList" 
               :key="index"
               @click="actionForumPageByName(item.forumName)">
            <div class="forum-item-left flex-row-center">
              <img :src="item.forumIcon" class="forum-icon">
            </div>
            <div class="forum-item-left flex-cloumn">
              <div class="forum-item-left-title">{{item.forumName}}吧</div>
              <div class="flex-row">
                <div class="flex-row-y-center" style="margin-left: 5px; margin-top: 5px">
                  <img src="../../assets/user_num.png" class="icon">
                  <span class="font-num" style="margin-left: 2px">{{item.forumFollowerNum}}</span>
                </div>
                <div class="flex-row-y-center" style="margin-left: 15px; margin-top: 5px">
                  <img src="../../assets/write_icon.png" class="icon">
                  <span class="font-num" style="margin-left: 2px">{{item.invitation.length}}</span>
                </div>
              </div>
              <div class="forum-item-left-introduce">{{item.forumIntroduce}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputComponentName",
  components: {},
  props: {},
  data() {
    return {
      type: undefined,
      forumList: [],
      typeList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    fetchForumTypes(type) {
      this.$http
        .post("/api/forum/type", {
          type: type
        })
        .then(res => {
          const data = res.data.data;
          this.forumList = data.forum_list;
          this.typeList = data.type_list;
        });
    },
    changeKeyWord(keyWord) {
      this.type = keyWord;
      this.fetchForumTypes(keyWord);
    },
    actionForumPageByName(forumName) {
      console.log(forumName);
      this.$router.push({
        path: "/forum/home",
        query: {
          forumName: forumName
        }
      });
    },
  },
  created() {},
  mounted() {
    this.type = this.$route.query.type;
    this.fetchForumTypes(this.type);
  }
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
.title {
  width: 60vw;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 500;
  color: rgb(82, 173, 75);
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0px;
}
.content {
  width: 60vw;
  height: 60vh;
}
.left {
  width: 30%;
  height: 100%;
  border-right: 1px solid #eeeeee;
  background-color: #f5f8fa;
  margin-right: 10px;
}
.left-title {
  background-color: rgb(82, 173, 75);
  color: white;
  font-size: 16px;
  padding: 5px 5px;
}
.left-content {
  width: 80%;
  margin-left: 10%;
}
.left-content-item {
  padding: 2px 5px;
  border-right: 1px solid #eeeeee;
  font-size: 12px;
  color: #666666;
  float: left;
  margin-top: 10px;
  cursor: pointer;
}
.right {
  width: 70%;
  height: 100%;
}
.forum-item {
  float: left;
  width: 45%;
  height: 150px;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}
.forum-item:nth-of-type(2n) {
  margin-left: 8%;
}
.forum-item-left {
  width: 50%;
  height: 80%;
  border-right: 1px solid #eeeeee;
}
.forum-icon {
  width: 90px;
  height: 90px;
  margin-left: 10px;
}
.forum-item-left-title {
  font-size: 16px;
  color: #333333;
  margin-left: 5px;
  margin-top: 5px;
}
.forum-item-left-introduce {
  font-size: 12px;
  margin-left: 5px;
  margin-top: 5px;
  color: #999999;
}
.icon {
  width: 16px;
  height: 16px;
}
.font-num {
  font-size: 12px;
  color: #f96e02;
  font-weight: 500;
}
</style>