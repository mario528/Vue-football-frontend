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
              :on-exceed="handleExceed">
              <el-button slot="trigger" size="small" type="primary" class="file-btn">选取文件</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="information-item flex-row-x-center" v-for="(item,index) in infoList" v-bind:key="index">
        <div class="item-left flex-row">
          <div class="item-title">{{item.title}}</div>
          <div class="item-class" v-if="!item.isShow">{{userName}}</div>
          <div class="item-input" v-if="item.placeholder && item.isShow">
            <input type="text" class="user-input" v-bind:placeholder="item.placeholder" />
          </div>
        </div>
        <div class="item-change" v-bind:id="index" v-on:click="actionToChangeInfo" v-if="!item.isShow">
          <i class="el-icon-edit item-icon"></i>
          <span class="change-text">修改</span>
        </div>
        <div class="item-change flex-row-y-center" v-bind:id="index" v-on:click="actionToOperation" v-else>
          <div id="0" class="item-btn">保存</div>
          <div id="1" class="item-btn">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'userChangeInfo',
  components: {},
  props: {},
  data () {
    return {
      username: undefined,
      sex: undefined,
      favouriteTeam: undefined,
      uploadData: {},
      infoList: []
    }
  },
  watch: {},
  computed: {
    ...mapState(['userName', 'userIconUrl']),
    ...mapGetters(['getUsername'])
  },
  methods: {
    ...mapActions(['setUserIconUrl']),
    beforeUpload (file) {
      this.uploadData.userName = this.userName
      console.log('文件名：' + file.name)
      this.files = file
      const fileType1 = file.name.split('.')[1] === 'jpg'
      const fileType2 = file.name.split('.')[1] === 'png'
      const fileType3 = file.name.split('.')[1] === 'jpeg'
      if (fileType1 === false && fileType2 === false && fileType3 === false) {
        this.$notify.error({
          title: '错误',
          message: '只支持上传以jpg,png,jpeg结尾的图片类型'
        })
        return false
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$notify.error({
          title: '错误',
          message: '只支持上传小于5M大小的图片'
        })
        return false
      }
    },
    actionToChangeInfo (event) {
      const currentPage = event.currentTarget.id
      this.infoList[currentPage].isShow = true
    },
    actionToOperation (event) {
    },
    actionToLoadHeadIcon () {
      console.log('上传图片')
    },
    // 成功上传后的回调函数
    uploadSuccess (res) {
      if (res.data.state === 1) {
        this.setUserIconUrl('data:image/png;base64,' + res.data.userIcon)
      }
    },
    // 请求用户信息
    fetchUserInformation (name) {
      this.$http.post('/api/user/information', {
        username: name
      }).then((res) => {
        console.log(res)
        this.infoList = res.data.data.infoList
      })
    }
  },
  created () {
  },
  mounted () {
    this.fetchUserInformation(this.userName)
  }
}
</script>
<style scoped>
.container {
  background-color: rgb(224, 225, 225);
}
.user-info {
  width: 50vw;
  height: 40vw;
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
  font-size: 16px;
  font-weight: 600;
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
</style>
