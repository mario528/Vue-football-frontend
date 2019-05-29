<template>
  <div class="app flex-column-center">
    <div class="forum-content flex-column-center" v-if="!foundSuccess">
      <div class="forum-title">创建新的球迷圈</div>
      <div class="forum-main-content">
        <el-input type="text" class="forum-input" v-model="foundForumName" disabled/>
        <el-upload
          class="avatar-uploader"
          action="/api/loadForumIcon"
          :data="uploadData"
          :show-file-list="false"
          :onSuccess="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          class="forum-detail-text"
          type="textarea"
          :rows="4"
          placeholder="请输入论坛基本介绍"
          v-model="textarea"
        ></el-input>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加论坛的个性标签</el-button>

        <div class="flex-row" style="margin-top:20px">
          <el-input
            placeholder="请输入验证码"
            class="found-input-verification-code"
            v-model="verificationInput"
          />
          <div class="verification" v-html="verificationImg" v-on:click="getVerificationCode"></div>
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
import { mapState } from "vuex";
export default {
  name: "forumFound",
  components: {},
  props: {},
  data() {
    return {
      uploadData: {},
      foundForumName: "",
      verificationImg: "",
      verificationText: "",
      disabledBtn: true,
      verificationInput: "",
      foundSuccess: false,
      countNum: 5,
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      textarea: "",
      imageUrl: ""
    };
  },
  watch: {
    verificationInput: function() {
      if (this.verificationInput === this.verificationText) {
        this.disabledBtn = false;
      }
    }
  },
  computed: {
    ...mapState(["isLogin", "userName", "userIconUrl"])
  },
  methods: {
    getVerificationCode() {
      this.$http.get("/api/user/getVerificationCode").then(res => {
        const data = res.data.data;
        this.verificationImg = data.svgUrl;
        this.verificationText = data.svgText;
      });
    },
    actionToFound() {
      const that = this;
      if (this.dynamicTags.length == 0) {
        this.$notify.error({
          title: "",
          message: "请添加一些标签吧～"
        });
        return;
      } else if (this.textarea == "") {
        this.$notify.error({
          title: "",
          message: "写一些论坛介绍吧～"
        });
        return;
      } else if (this.verificationInput !== this.verificationText) {
        this.$notify.error({
          title: "",
          message: "验证吗输入有误"
        });
        this.getVerificationCode();
      }
      this.$http
        .post("/api/forum/found", {
          forumName: this.foundForumName,
          foundBy: this.userName,
          userIcon: this.userIconUrl,
          forumIcon: this.imageUrl,
          forumTabs: this.dynamicTags,
          forumIntroduce: this.textarea
        })
        .then(res => {
          if (res.data.state === true) {
            that.foundSuccess = true;
          }
        });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    uploadSuccess(res) {
      if (res.data.state === 1) {
        this.imageUrl = (res.data.userIcon);
      }
    },
    beforeUpload(file) {
      this.uploadData.froumName = this.foundForumName;
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
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  created() {
    this.foundForumName = this.$route.query.forumName;
    this.getVerificationCode();
  },
  mounted() {}
};
</script>
<style scoped>
.forum-content {
  width: auto;
  height: auto;
  border: 1px solid #67c23a;
  margin-top: 60px;
  padding: 50px 100px;
  border-radius: 15px;
}
.forum-title {
  font-size: 20px;
  color: #67c23a;
  font-weight: 500;
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
.avatar-uploader,
.el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus {
  border: 1px dashed gainsboro;
}
.el-icon-plus:hover {
  border: 1px dashed rgb(82, 173, 75);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5vw;
  height: 5vw;
  line-height: 5vw;
  text-align: center;
  margin-bottom: 20px;
}
.forum-detail-text {
  margin: 20px 0px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-button:hover {
  border: 1px solid rgb(82, 173, 75);
  background-color: rgb(82, 173, 75);
  color: white;
}
.avatar{
   width: 10vw;
   height: 10vw;
   border-radius: 0px;
}
</style>
