<template>
  <div class="app flex-row-x-center">
      <div class="user-center-box flex-column-x-center">
          <div class="user-detail flex-row-y-center">
              <div class="user-png">
                  <img class="user-icon" :src="isVisit?userIconUrl_v1:userIconUrl"/>
              </div>
              <div class="user-info flex-row-y-center">
                <div class="vip flex-row-y-center">
                    <img class="vip-icon" src="../../assets/vip.png"/>
                </div>
                <span class="user-nickname flex-row-y-center">{{isVisit == true ? visitName : userName}}</span>
              </div>
              <button class="action-user-info" v-on:click="actionToChangeInfo">点击编辑个人资料</button>
          </div>
          <transition>
            <div class="user-detail flex-row" v-on:click="catchSwitchTab">
                <div :class='currentIndex == 0 ?"user-tab-activity":"user-tab-normal"' id="0">
                  {{isVisit == true ? 'TA' : '我' }}的帖子
                  <div class="bottom-line" v-if="currentIndex == 0"></div>
                </div>
                <div :class='currentIndex == 1 ?"user-tab-activity":"user-tab-normal"' id="1">
                  {{isVisit == true ? 'TA' : '我' }}的收藏
                  <div class="bottom-line" v-if="currentIndex == 1"></div>
                </div>
                <div :class='currentIndex == 2 ?"user-tab-activity":"user-tab-normal"' id="2">
                  {{isVisit == true ? 'TA' : '我' }}的回复
                  <div class="bottom-line" v-if="currentIndex == 2"></div>
                </div>
                <div :class='currentIndex == 3 ?"user-tab-activity":"user-tab-normal"' id="3">
                  回复{{isVisit == true ? 'TA' : '我' }}的
                  <div class="bottom-line" v-if="currentIndex == 3"></div>
                </div>
            </div>
          </transition>
          <div class="history-detail">
             <div class="no-result" v-if="userPubLish.length == 0">
                暂无内容
              </div>
            <div class="content flex-column" v-for="(item,index) in userPubLish" 
                 v-bind:key="index" 
                 :data-id="item.forum_id" 
                 :data-forumName="item.content[0].forumName"
                 v-on:click="actionToForum">
              <div class="content-top">
                  <div class="forum-title">{{item.content[0].forumTitle}}</div>
              </div>
              <div class="content-bottom flex-row-space-between">
                <div class="forum-content">{{item.content[0].forumContent}}</div>
                <div class="forum-content">{{item.content[0].time}}</div>
              </div>
            </div>
          </div>
      </div>
       <div class="favourite-team flex-column-x-center">
         <div class="team-item">
           <img  class="team-icon" src="../../assets/team_icon.png"/>
         </div>
         <div class="user-tab flex-row">
           <span class="tab-item" :data-type="0" v-on:click="actionToUserFriend">
             <div class="tab-title">关注的人</div>
             <div class="tab-num">{{userInfo.attentionNum}}</div>
           </span>
           <span class="tab-item" :data-type="1" v-on:click="actionToUserFriend">
             <div class="tab-title">{{isVisit == true ? 'TA' : '我' }}的粉丝</div>
             <div class="tab-num">{{userInfo.followersNum}}</div>
           </span>
         </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'userCenter',
  components: {},
  props: {},
  data () {
    return {
      currentIndex: 0,
      userInfo:{},
      userPubLish: undefined,
      isVisit: false
    }
  },
  watch: {},
  computed: {
    ...mapState([
      'userName','userIconUrl'
    ])
  },
  methods: {
    catchSwitchTab (ev) {
      this.currentIndex = ev.target.id;
      this.fetchUserCenter(this.currentIndex);
    },
    actionToChangeInfo () {
      this.$router.push('/userChangeInfo')
    },
    fetchUserCenter(type) {
      this.$http.post('/api/user/userCenter',{
        username: this.isVisit == true ? this.visitName : this.userName,
        type: type
      }).then((res)=> {
        const userInfo = res.data.userInfo;
        this.userInfo = userInfo;
        this.userIconUrl_v1 = userInfo.userImageUrl;
        this.userPubLish = res.data.userInfo.userPubLish;
      })
    },
    actionToForum(ev) {
      const forumId = ev.currentTarget.dataset.id;
      const forumName = ev.currentTarget.dataset.forumname;
      this.$router.push({
        path: '/forum/page',
        query: {
          forumId: forumId,
          forumName: forumName
        }
      })
    },
    actionToUserFriend(ev) {
       const friendType = ev.currentTarget.dataset.type;
       this.$router.push({
        path: '/user/friend',
        query: {
          userName: this.isVisit ? this.visitName : this.userName,
          friendType: friendType
        }
      })
    }
  },
  created () {
    if(this.$route.query.fromPage && this.$route.query.fromPage == 'forumPage' ) {
       this.visitName = this.$route.query.userName
       this.isVisit = true
    }
  },
  mounted () {
    this.fetchUserCenter(0);
  }
}
</script>
<style scoped>
.user-center-box {
  background-color: rgb(224, 225, 225);
  width: 50vw;
  margin-top: 40px;
}
.user-detail {
    width: 50vw;
    background-color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    padding-bottom: 10px;
    position: relative;
}
.user-png {
  margin-left: 30px;
}
.user-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user-info {
    margin-left: 20px;
    margin-bottom: 60px;
}
.user-nickname {
    font-size: 26px;
    color: black;
    font-weight: 500;
}
.action-user-info {
    color: rgb(82, 173, 75);
    background-color: white;
    border: 1px solid rgb(82, 173, 75);
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.user-tab-normal {
    width: 10vw;
    height: 40px;
    line-height: 40px;
    color:black;
    text-align: center;
    cursor: pointer;
}
.user-tab-activity {
    width: 10vw;
    height: 40px;
    line-height: 40px;
    color:rgb(82, 173, 75);
    text-align: center;
    cursor: pointer;
}
.bottom-line {
  width: 2vw;
  height: 2px;
  /* position: absolute; */
  /* bottom: 5px; */
  margin-left: 4vw;
  background-color: rgb(82, 173, 75);
}
.history-detail {
  width: 50vw;
  height: auto;
  min-height: 200px;
  margin-top: 20px;
  background-color: #ffffff;
}
.favourite-team {
  width: 20vw;
  height: 400px;
  margin-top: 40px;
  margin-left: 20px;
  background-color: #fff;
}
.team-icon {
  width: 100px;
  height: 100px;
}
.team-item {
  margin-top: 10px;
}
.tab-item {
  width: 10vw;
  text-align: center;
  margin-top: 15px;
  border-bottom: 3px solid rgb(82, 173, 75);
  padding-bottom: 10px;
  cursor: pointer;
}
.tab-title {
  font-size: 16px;
  font-weight: 400;
  color: rgb(82, 173, 75);
}
.tab-num {
  font-size: 20px;
  font-weight: 500;
  color: rgb(82, 173, 75);
}
.vip-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.content {
  width: 100%;
  padding: 5rpx;
  border-bottom: 1px solid #eeeeee;
}
.forum-title {
  color: #2962B6;
  font-size: 14px;
  padding: 10px 5px;
}
.forum-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
.forum-content {
  color: #919499;
  font-size: 12px;
  padding: 10px 5px;
}
.no-result {
  font-size: 20px;
  color: black;
  text-align: center;
  margin-top: 50px;
}
</style>
