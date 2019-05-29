<template>
  <div class="app flex-column-x-center">
    <div class="title">
      <span>{{friendType == 0 ? '全部关注' : '我的粉丝'}}</span>
      <span>{{friendList.length}}</span>
    </div>
    <div class="friend-area">
      <div v-if="friendList.length == 0">{{friendType == 0 ? '您还未关注别人哦，去和其他用户互动吧～' : '您暂无粉丝哦'}}</div>
      <div
        class="friend-item flex-row-y-center"
        v-for="(item,index) in friendList"
        v-bind:key="index"
      >
        <div class="item-left">
          <div class="img-box">
            <img :src="item.userImageUrl" class="friend-icon">
          </div>
        </div>
        <div class="item-right">
          <div class="setting-box flex-row-center">
            <el-dropdown @command="handleCommand">
              <img src="../../assets/setting.png" class="setting-icon">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="composeValue('usercenter',item.username)" class="drop-item">TA的首页</el-dropdown-item>
                <el-dropdown-item :command="composeValue('usercenter')" class="drop-item">私信</el-dropdown-item>
                <el-dropdown-item
                  :command="composeValue('cancel',item.username)"
                  class="drop-item"
                  v-if="friendType == 0"
                >取消关注</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="friend-name">{{item.username}}</div>
          <div class="friend-introduce">{{item.selfIntroduce}}</div>
          <div class="friend-state flex-row-y-center">
            <img src="../../assets/success_right.png" class="state">
            <p style="margin-left: 5px">已关注</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "userFriend",
  components: {},
  props: {},
  data() {
    return {
      friendList: []
    };
  },
  watch: {},
  computed: {
       ...mapState([
      'userName','userIconUrl'
    ])
  },
  methods: {
    fetchUserFriend() {
      this.$http
        .post("/api/user/friend", {
          userName: this.userName,
          type: this.friendType
        })
        .then(res => {
          const data = res.data.data;
          this.friendList = data.friendList;
        });
    },
    handleCommand(command) {
        switch (command.key) {
        case 'usercenter': 
          this.actionToUserCenter(command.value)
          break
        case 'cancel':
          this.fetchCancelAttantion(command.value)
          break
        case 'homePage':
          this.$router.push('/home')
          break
      }
    },
    composeValue(key,value) {
        return {
            key: key,
            value: value
        }
    },
    fetchCancelAttantion(friendName) {
        this.$http.post('/api/user/cancelAttention',{
            username: this.userName,
            friendName: friendName
        }).then((res)=> {
            debugger
        })
    },
    actionToUserCenter(userName) {
      this.$router.push({
        path: '/userCenter',
        query: {
          fromPage: 'forumPage',
          userName: userName
        }
      })
    }

  },
  created() {},
  mounted() {
    this.friendType = this.$route.query.friendType; // 0 关注者 1 粉丝
    this.userName = this.$route.query.userName; // 0 关注者 1 粉丝
    this.fetchUserFriend();
  }
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
  min-height: 90vh;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 72vw;
  float: left;
  font-size: 20px;
  border-bottom: 1px solid #f2f2f5;
  padding-bottom: 10px;
}
.friend-area {
  width: 72vw;
}
.friend-item {
  width: 20vw;
  min-height: 80px;
  float: left;
  background-color: #f2f2f5;
  margin-top: 10px;
  margin-left: 3vw;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.11);
}
.friend-item:nth-of-type(2n) {
  margin-left: 3vw;
}
.img-box {
  width: 100%;
  padding: 0px 10px;
}
.friend-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.item-left {
  height: 80%;
  border-right: 2px solid rgb(82, 173, 75);
}
.item-right {
  height: 80%;
  width: 15vw;
  margin-left: 10px;
  position: relative;
}
.state {
  width: 12px;
  height: 15px;
}
.friend-name {
  font-size: 14px;
  font-weight: 500;
}
.friend-introduce {
  margin-bottom: -10px;
}
.setting-icon {
  width: 15px;
  height: 15px;
}
.setting-box {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 4px;
  text-align: center;
}
</style>