<template>
  <div class="app">
    <div class="flex-row">
      <div class="flex-column">
        <div class="player-title flex-row-y-center">
          <div class="player-team">
            <img :src="playInfo.clubLogo" class="club-logo">
          </div>
          <div class="player-title-info flex-column-center">
            <div class="player-title-info-line flex-row-y-center">
              <div class="player-text">{{playDetail.number}}</div>
              <div class="player-text">{{playerName}}</div>
              <div class="player-text">{{playInfo.playerEnName}}</div>
            </div>
            <div class="player-title-info-line flex-row-y-center">
              <img :src="playInfo.natLogo" class="nation-flag-icon">
              <div class="player-text">{{playDetail.country}}</div>
              <div class="player-text">{{playDetail.club}}</div>
            </div>
          </div>
        </div>
        <div class="player-detail flex-row">
          <img :src="playInfo.playerIcon" class="player-icon">
          <div class="player-info flex-column-y-center">
            <div class="player-info-line flex-row">
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">俱 乐 部</div>
                <div class="player-info-text">{{playDetail.club}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">位 置</div>
                <div class="player-info-text">{{playDetail.position}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">号 码</div>
                <div class="player-info-text">{{playDetail.number}}</div>
              </div>
            </div>
            <div class="player-info-line flex-row">
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">国家/地区</div>
                <div class="player-info-text">{{playDetail.country}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">年 龄</div>
                <div class="player-info-text">{{playDetail.age}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">生 日</div>
                <div class="player-info-text">{{playDetail.birthday}}</div>
              </div>
            </div>
            <div class="player-info-line flex-row">
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">身 高</div>
                <div class="player-info-text">{{playDetail.height}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">体 重</div>
                <div class="player-info-text">{{playDetail.weight}}</div>
              </div>
              <div class="player-info-tr flex-row-y-center">
                <div class="player-info-text">惯 用 脚</div>
                <div class="player-info-text">{{playDetail.foot}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="player-invalid">
          <div class="player-invalid-title">伤病</div>
          <div v-if="invalidList.length == 0" class="tips flex-row-center">暂无相关记录</div>
          <div
            class="player-invalid-item flex-row"
            v-for="(item,index) in invalidList"
            v-bind:key="index"
          >
            <div class="invalid-team">{{item.invalidTeam}}</div>
            <div class="invalid-reason">{{item.invalidDetail}}</div>
            <div class="invalid-time">{{item.invalidTime}}</div>
          </div>
        </div>
        <div class="player-invalid">
          <div class="player-invalid-title">荣誉</div>
          <div v-if="honnerList.length == 0" class="tips flex-row-center">暂无相关记录</div>
          <div
            class="player-honner-item flex-row-y-center"
            v-for="(item,index) in honnerList"
            v-bind:key="index"
          >
            <img :src="item.honnerImg" class="honnerImg-icon">
            <span class="player-honner-time">X {{item.honnerTimes}}</span>
            <span class="player-honner-text">{{item.honnerTitle}}</span>
            <div class="player-honner-text">
              <span
                v-for="(nextItem,nextIndex) in item.sessions"
                v-bind:key="nextIndex"
                class="honner-item"
              >{{nextItem}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-column">
        <div class="player-ability flex-column">
          <span class="player-invalid-title" id="title">球员基本数据</span>
          <div class="player-ability-main">
            <!-- <canvas id="player-ability-canvas"></canvas> -->
            <div class="player-ability-main-item flex-column-center" id="ability">
              <div class="player-ability-title">综合能力</div>
              <div class="player-ability-content">{{abilityObj.ability}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="defend">
              <div class="player-ability-title">防御</div>
              <div class="player-ability-content">{{abilityObj.defend}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="dribbling">
              <div class="player-ability-title">盘带</div>
              <div class="player-ability-content">{{abilityObj.dribbling}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="pass">
              <div class="player-ability-title">传球</div>
              <div class="player-ability-content">{{abilityObj.pass}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="shoot">
              <div class="player-ability-title">射门</div>
              <div class="player-ability-content">{{abilityObj.shoot}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="speed">
              <div class="player-ability-title">速度</div>
              <div class="player-ability-content">{{abilityObj.speed}}</div>
            </div>
            <div class="player-ability-main-item flex-column-x-center" id="strong">
              <div class="player-ability-title">力量</div>
              <div class="player-ability-content">{{abilityObj.strong}}</div>
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
      playerName: undefined,
      playerData: undefined,
      playInfo: undefined,
      playDetail: undefined
    };
  },
  watch: {},
  computed: {},
  methods: {
    fetchPlayerData() {
      this.$http
        .post("/api/data/player", {
          playerName: this.playerName
        })
        .then(res => {
          const playerData = res.data.result.data;
          this.playInfo = playerData.playInfo;
          this.playDetail = playerData.playDetail;
          this.abilityObj = playerData.abilityObj;
          this.invalidList = playerData.invalidList;
          this.honnerList = playerData.honnerList;
        });
    },
    canvasInit() {
      const canvas = document.getElementById("player-ability-canvas");
    }
  },
  created() {
    this.playerName = this.$route.query.playerName;
    this.fetchPlayerData();
  },
  mounted() {}
};
</script>
<style scoped>
.player-title {
  width: 60vw;
  padding: 20px 60px;
  background-color: #2e8b57;
  margin: 20px 0px 0px 20px;
  color: white;
}
.club-logo {
  width: 130px;
  height: 130px;
}
.player-text {
  font-size: 20px;
  margin-right: 10px;
}
.nation-flag-icon {
  margin-right: 10px;
}
.player-title-info {
  margin-left: 20vw;
}
.player-detail {
  margin: 0px 0px 0px 20px;
  padding: 20px 60px;
  width: 60vw;
  background-color: #f5f5f5;
}
.player-info {
  margin-left: 5vw;
  width: 45vw;
}
.player-info-line {
  width: 45vw;
}
.player-info-tr {
  width: 15vw;
}
.player-info-text {
  width: 15vw;
  text-align: start;
  padding: 10px 0px;
  font-size: 16px;
  color: #2e8b57;
}
.player-ability {
  width: 25vw;
  height: auto;
  margin: 20px 0px 0px 20px;
  position: relative;
  background-color: #2e8b57;
}
.player-ability-title {
  color: white;
  font-weight: 500;
  font-size: 18px;
  margin-top: -20px;
  /* padding: 10px 0px 10px 30px; */
}

.player-ability-main {
  border: white 1px solid;
  width: 100%;
  height: 70vh;
  background-image: url("../../../assets/football_background.jpg");
  background-size: 100% 100%;
}
.player-ability-main-item {
  position: absolute;
}
#title {
  padding: 10px 10px;
  color: white;
}
#ability {
  left: 40%;
  top: 20%;
}
#speed {
  left: 45%;
  top: 30%;
}
#strong {
  left: 10%;
  top: 40%;
}
#shoot {
  right: 10%;
  top: 40%;
}
#defend {
  left: 10%;
  top: 55%;
}
#pass {
  right: 10%;
  top: 55%;
}
#dribbling {
  left: 45%;
  top: 65%;
}
.player-invalid {
  width: 60vw;
  margin: 20px 0px 0px 20px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
}
.player-invalid-item {
  padding: 10px 0px;
  background-color: #f7f7f7;
}
.invalid-team,
.invalid-reason,
.invalid-time {
  text-align: start;
  width: 20vw;
  font-size: 16px;
  color: #2e8b57;
}
.player-invalid-title {
  width: 15vw;
  background: linear-gradient(to left, transparent 98%, #2e8b57 2%);
  color: #2e8b57;
  font-weight: 500;
  padding: 5px 20px;
  font-size: 16px;
}
.honnerImg-icon {
  width: 40px;
  height: 40px;
}
.player-honner-item {
  background-color: #fafafa;
  border-bottom: 2px solid #eeeeee;
}
.player-honner-item span {
  font-size: 16px;
  color: #2e8b57;
  padding: 20px 0px;
}
.player-honner-time {
  margin-right: 5vw;
  margin-left: 20px;
}
.player-honner-text {
  width: 20vw;
}
.player-ability-content {
  font-size: 16px;
  padding: 5px;
  background-color: #ff7d04;
  color: white;
}
.honner-item {
  margin-left: 20px;
}
.tips {
  width: 100%;
  height: 100px;
  font-size: 16px;
}
</style>
