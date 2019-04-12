<template>
  <div class="container flex-row-x-center">
    <div class="user-info">
      <div class="userinfo-title">个人资料</div>
      <div class="information-item">
        <div class="flex-row-y-center">
          <div class="item-title">头像</div>
          <img class="user-icon" :src="userIconUrl">
          <div class="upload-detail">
            <span class="upload-tips">支持jpg,png,jpeg格式大小5M以内的图片</span>
            <el-upload
              class="upload-demo"
              action="/api/loadUserIcon"
              :data="uploadData"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :onSuccess="uploadSuccess"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <el-button slot="trigger" size="small" type="primary" class="file-btn">选取文件</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="information-item flex-row-y-center">
        <div class="item-title">用户名</div>
        <div class="item-class">{{userName}}</div>
      </div>
      <div
        class="information-item flex-row-x-center"
        v-for="(item,index) in infoList"
        v-bind:key="index"
      >
        <div class="item-left flex-row">
          <div class="item-title">{{item.title}}</div>
          <div class="item-class" v-if="!item.isShow && item.title == '用户名'">{{userInfo.username}}</div>
          <div class="item-class grey" v-if="!item.isShow && item.title == '密码'">点击修改</div>
          <div
            class="item-class"
            v-if="!item.isShow && item.title == '手机号'"
          >{{userInfo.phoneNumber}}</div>
          <div
            class="item-class"
            v-if="!item.isShow && item.title == '个人介绍'"
          >{{userInfo.selfIntroduce == undefined ? '未编辑' : userInfo.selfIntroduce}}</div>
          <div
            class="item-class"
            v-if="!item.isShow && item.title == '性别'"
          >{{userInfo.sex == undefined ? '未编辑' : userInfo.sex}}</div>
          <div class="item-input" v-if="item.placeholder && item.isShow">
            <input
              type="text"
              class="user-input"
              v-bind:placeholder="item.placeholder"
              v-model="changeContent"
            >
          </div>
        </div>
        <div
          class="item-change"
          v-bind:id="index"
          v-on:click="actionToChangeInfo"
          v-if="!item.isShow"
        >
          <i class="el-icon-edit item-icon"></i>
          <span class="change-text" data-type="item.title">修改</span>
        </div>
        <div
          class="item-change flex-row-y-center"
          v-bind:id="index"
          v-on:click="actionToOperation"
          v-else
        >
          <div :id="index" class="item-btn" v-on:click="saveChange">保存</div>
          <div :id="index" class="item-btn" v-on:click="cancelChange">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "userChangeInfo",
  components: {},
  props: {},
  data() {
    return {
      username: undefined,
      sex: undefined,
      favouriteTeam: undefined,
      uploadData: {},
      infoList: [],
      changeContent: undefined,
      keyMap: [
        { key: "username" },
        { key: "password" },
        { key: "phoneNumber" },
        { key: "selfIntroduce" },
        { key: "sex" }
      ],
      userInput: undefined
    };
  },
  watch: {},
  computed: {
    ...mapState(["userName", "userIconUrl"]),
    ...mapGetters(["getUsername"]),
    ...mapActions(["setUsername"])
  },
  methods: {
    ...mapActions(["setUserIconUrl"]),
    beforeUpload(file) {
      this.uploadData.userName = this.userName;
      console.log("文件名：" + file.name);
      this.files = file;
      const fileType1 = file.name.split(".")[1] === "jpg";
      const fileType2 = file.name.split(".")[1] === "png";
      const fileType3 = file.name.split(".")[1] === "jpeg";
      if (fileType1 === false && fileType2 === false && fileType3 === false) {
        this.$notify.error({
          title: "错误",
          message: "只支持上传以jpg,png,jpeg结尾的图片类型"
        });
        return false;
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$notify.error({
          title: "错误",
          message: "只支持上传小于5M大小的图片"
        });
        return false;
      }
    },
    actionToChangeInfo(event) {
      const currentPage = event.currentTarget.id;
      console.log(this.infoList[Number(currentPage)]);
      this.$set(this.infoList[Number(currentPage)], "isShow", true);
    },
    actionToOperation(event) {},
    actionToLoadHeadIcon() {
      console.log("上传图片");
    },
    // 成功上传后的回调函数
    uploadSuccess(res) {
      if (res.data.state === 1) {
        this.setUserIconUrl(res.data.userIcon);
      }
    },
    // 请求用户信息
    fetchUserInformation(name) {
      const that = this;
      this.$http
        .post("/api/user/information", {
          username: name
        })
        .then(res => {
          console.log(res);
          const data = res.data.data;
          this.infoList = data.infoList;
          this.userInfo = data.userInfo;
          this.infoList.forEach(element => {
            that.$set(element, "isShow", false);
          });
        });
    },
    cancelChange(ev) {
      this.changeContent = undefined;
      const currentIndex = ev.currentTarget.id;
      this.$set(this.infoList[Number(currentIndex)], "isShow", false);
    },
    saveChange(ev) {
      const that = this;
      const currentIndex = ev.currentTarget.id;
      this.$set(this.infoList[Number(currentIndex)], "isShow", false);
      const key = this.keyMap[currentIndex].key;
      this.$http
        .post("/api/changeUserInfo", {
          userName: this.userName,
          changeContent: this.changeContent,
          type: currentIndex // 0: 用户名 1: 密码 2: 手机号 3: 自我介绍 4: 性别
        })
        .then(res => {
          this.fetchUserInformation(this.userName);
        });
    }
  },
  created() {
    this.fetchUserInformation(this.userName);
  },
  mounted() {}
};
</script>
<style scoped>
.container {
  background-color: rgb(224, 225, 225);
}
.user-info {
  width: 50vw;
  height: auto;
  margin-top: 5vw;
  background-color: #fff;
}
.userinfo-title {
  font-size: 30px;
  font-weight: 500;
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
}
.item-title {
  font-size: 16px;
  font-weight: 600;
  width: 70px;
}
.information-item {
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px solid #eeeeee;
  padding: 30px 0px 30px 0px;
}
.item-left {
  width: 90%;
}
.item-class {
  margin-left: 80px;
  font-size: 14px;
  font-weight: 600;
  color: grey;
}
.change-text {
  font-size: 14px;
  color: rgb(82, 173, 75);
}
.item-icon {
  font-size: 18px;
  color: rgb(82, 173, 75);
}
.user-icon {
  width: 100px;
  height: 100px;
  margin-left: 80px;
}
.upload-detail {
  margin-left: 10px;
}
.file-btn {
  background-color: rgb(82, 173, 75);
  color: white;
  margin-top: 15px;
  cursor: pointer;
}
.user-input {
  width: 300px;
  height: 30px;
  margin-left: 80px;
  outline: #eeeeee;
}
.item-btn {
  width: 30px;
  font-size: 15px;
  color: rgb(82, 173, 75);
}
.item-btn:nth-child(2) {
  margin-left: 10px;
}
.item-change {
  text-align: center;
}
.grey {
  color: grey;
}
</style>
