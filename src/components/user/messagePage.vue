<template>
  <div class="app flex-row-x-center">
    <div class="container flex-row">
      <div class="history-list"></div>
      <div class="chat-content flex-column">
        <div class="chat-title flex-row-y-center">
          <div class="jordansw-name">{{jordansw}}</div>
          <div :class="isOnline == true ? 'green' : 'grey'"></div>
        </div>
        <div class="triangle">
          <li
            v-for="(item,index) in msgList"
            v-bind:key="index"
            :class="item.from != 'self' ? 'textLeft' : 'textRight'"
          >
            <span>{{item.content}}</span>
          </li>
        </div>
        <div class="input-area">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="userinput"></el-input>
          <el-button style="float:right; margin:5px 10px 0px 0px;" v-on:click="send">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "InputComponentName",
  components: {},
  props: {},
  data() {
    return {
      inputText: "",
      msgList: [],
      userinput: "",
      isOnline: true
    };
  },
  watch: {},
  computed: {
    ...mapState(["isLogin", "userName", "userIconUrl"])
  },
  methods: {
    send() {
      if (this.userinput != "") {
        this.$socket.emit("sendMsg", {
          to: this.jordansw,
          msg: this.userinput
        });
      }
    }
  },
  created() {},
  mounted() {
    this.userName = this.$route.query.userName;
    this.jordansw = this.$route.query.jordansw;
  }
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/wechat_bg.jpg");
  background-size: 100% 100%;
}
.container {
  width: 60vw;
  height: auto;
  min-height: 70vh;
  background-color: white;
}
.history-list {
  width: 25%;
  height: 100%;
  background-color: #292c33;
}
.chat-content {
  width: 75%;
}
.chat-title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(82, 173, 75);
}
.jordansw-name {
  margin-left: 5%;
  font-size: 17px;
  color: black;
  font-weight: 500;
}
.chat-area {
  width: 100%;
  height: 60%;
  overflow: scroll;
  border-bottom: 1px solid rgb(82, 173, 75);
  border-radius: 2px;
}
.char-row {
  width: 100%;
}
.right-chat-span {
  width: 100%;
  height: auto;
  padding: 10px 0px;
  font-size: 20px;
}
.right-content {
  width: 100%;
  text-align: right;
  font-size: 20px;
  margin-top: 20px;
  position: relative;
}
.right-span {
  width: 40%;
  height: auto;
  background-color: rgb(82, 173, 75);
  color: white;
  padding: 5px 5px;
  position: absolute;
  right: 5px;
  top: 0px;
}
.left-content {
  width: 100%;
  text-align: left;
  font-size: 20px;
  background-color: white;
  color: black;
  margin-top: 20px;
  position: relative;
}
.left-span {
  background-color: white;
  color: black;
  padding: 5px 5px;
  position: absolute;
  left: 0px;
}
.input-area {
  width: 100%;
  height: calc(40vh - 50px);
}
.green {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 20px;
  background-color: rgb(82, 173, 75);
}
.grey {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 20px;
  background-color: grey;
}
.left,
.right {
  min-height: 60px;
  position: relative;
  left: 10px;
  display: table;
  border-radius: 7px;
  background-color: #9eea6a;
  margin-bottom: 20px;
}
.right {
  /*使左右的对话框分开*/
  top: 20px;
  left: 150px;
  background-color: #fc3;
  float: right;
}
.left > p,
.right > p {
  /*使内容居中*/
  display: table-cell;
  vertical-align: middle;
  padding: 0 10px;
}
.left:before,
.right:after {
  /*用伪类写出小三角形*/
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 16px solid transparent;
  position: absolute;
  top: 11px;
}
/*分别给左右两边的小三角形定位*/
.left:before {
  border-right: 16px solid #9eea6a;
  left: -30px;
}
.right:after {
  border-left: 16px solid #fc3;
  right: -30px;
}

* {
  margin: 0;
  padding: 0;
}
.triangle {
  width: 100%;
  height: 60%;
  background-color: #ebebe9;
}
.triangle li {
  padding: 10px;
}
.triangle li {
  padding: 10px;
  margin-bottom: 10px;
}
.triangle li span {
  position: relative;
  border-radius: 7px;
  background-color: #a6e860;
  padding: 6px 10px 8px 10px;
  z-index: 1;
}
.triangle .textLeft span {
  background-color: white;
}
.triangle li.textLeft:before {
  box-sizing: border-box;
  position: relative;
  left: -10px;
  top: 9px;
}
.triangle li.textLeft span:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 8px solid white;
  position: absolute;
  top: 8px;
  left: -16px;
}
.triangle li.textRight:after {
  box-sizing: border-box;
  position: relative;
  right: -10px;
  top: 9px;
}
.triangle li.textRight span:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid #a6e860;
  position: absolute;
  top: 8px;
  right: -16px;
}
li {
  list-style: none;
}
.textRight {
  text-align: right;
}
.user-icon {
  width: 80px;
  height: 80px;
}
</style>