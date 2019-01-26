<template>
  <div class="app flex-row-x-center">
      <div class="user-center-box flex-column-x-center">
          <div class="user-detail flex-row-y-center">
              <div class="user-png">
                  <img class="user-icon" :src="userIconUrl"/>
              </div>
              <div class="user-info flex-row-y-center">
                <div class="vip flex-row-y-center">
                    <img class="vip-icon" src="../../assets/vip.png"/>
                </div>
                <span class="user-nickname flex-row-y-center">{{userName}}</span>
              </div>
              <button class="action-user-info" v-on:click="actionToChangeInfo">点击编辑个人资料</button>
          </div>
          <transition>
            <div class="user-detail flex-row" v-on:click="catchSwitchTab">
                <div :class='currentIndex == 0 ?"user-tab-activity":"user-tab-normal"' id="0">
                  我的帖子
                  <div class="bottom-line" v-if="currentIndex == 0"></div>
                </div>
                <div :class='currentIndex == 1 ?"user-tab-activity":"user-tab-normal"' id="1">
                  回复我的
                  <div class="bottom-line" v-if="currentIndex == 1"></div>
                </div>
                <div :class='currentIndex == 2 ?"user-tab-activity":"user-tab-normal"' id="2">
                  我的回复
                  <div class="bottom-line" v-if="currentIndex == 2"></div>
                </div>
                <div :class='currentIndex == 3 ?"user-tab-activity":"user-tab-normal"' id="3">
                  我的收藏
                  <div class="bottom-line" v-if="currentIndex == 3"></div>
                </div>
            </div>
          </transition>
          <div class="history-detail">
          </div>
      </div>
       <div class="favourite-team flex-column-x-center">
         <div class="team-item">
           <img  class="team-icon" src="../../assets/team_icon.png"/>
         </div>
         <div class="user-tab flex-row">
           <span class="tab-item">
             <div class="tab-title">关注的人</div>
             <div class="tab-num">100</div>
           </span>
           <span class="tab-item">
             <div class="tab-title">我的粉丝</div>
             <div class="tab-num">2000</div>
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
      currentIndex: 0
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
      this.currentIndex = ev.target.id
    },
    actionToChangeInfo () {
      this.$router.push('/userChangeInfo')
    }
  },
  created () {},
  mounted () {}
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
  height: 300px;
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
</style>
