<template>
  <div class="app">
      <div class="user-center-box flex-column-x-center">
          <div class="user-detail flex-row-y-center">
              <div class="user-png">
                  <img class="user-icon" src="../../assets/user-icon-test.png"/>
              </div>
              <div class="user-info">
                <span class="user-nickname">{{userName}}</span>
              </div>
              <button class="action-user-info">点击编辑个人资料</button>
          </div>
          <div class="user-detail flex-row" v-on:click="catchSwitchTab">
              <div :class='currentIndex == 0 ?"user-tab-activity":"user-tab-normal"' id="0">
                我的帖子
              </div>
              <div :class='currentIndex == 1 ?"user-tab-activity":"user-tab-normal"' id="1">
                回复我的
              </div>
              <div :class='currentIndex == 2 ?"user-tab-activity":"user-tab-normal"' id="2">
                我的回复
              </div>
              <div :class='currentIndex == 3 ?"user-tab-activity":"user-tab-normal"' id="3">
                我的收藏
              </div>
          </div>
          <div class="history-detail">
              11111
          </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  name: 'userCenter',
  components:{},
  props:{},
  data(){
    return {
        currentIndex: 0
    }
  },
  watch:{},
  computed:{
      ...mapState([
          'userName'
      ])
  },
  methods:{
      catchSwitchTab(ev) {
          this.currentIndex = ev.target.id
      }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.user-detail {
    width: 50vw;
    margin-top: 20px;
    position: relative;
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
}
.user-tab-activity {
    width: 10vw;
    height: 40px;
    line-height: 40px;
    color:rgb(82, 173, 75);
    border-bottom: 1px solid rgb(82, 173, 75);
    text-align: center;
}
</style>