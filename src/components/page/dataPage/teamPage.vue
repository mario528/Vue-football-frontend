<template>
  <div class="app flex-row">
    <div class="team-switch-tab flex-column-x-center">
      <div
        v-for="(item,index) in tabList"
        v-bind:key="index"
        v-bind:class="currentIndex == index ? 'team-switch-tab-item-activity' : 'team-switch-tab-item'"
        v-on:click="changeCurrentIndex(index)"
      >{{item}}</div>
    </div>
    <div class="team-content" v-if="currentIndex == 0">
      <div class="club-banner"></div>
      <div class="flex-row">
        <div class="flex-column">
          <div class="team-info flex-column">
            <div class="flex-row">
              <div class="flex-row-center">
                <div class="flex-row-y-center">
                  <img :src="teamIcon" class="team-icon">
                </div>
                <div class="team-detail flex-column-x-center">
                  <div class="flex-row-y-center">
                    <div class="team-name">{{teamName}}</div>
                    <img :src="nationalFlag" class="team-flag">
                  </div>
                  <div class="team-nick-name">{{teamNickName}}</div>
                  <div class="team-chart-btn" v-on:click="actionJumpBI">数据可视化展示</div>
                </div>
              </div>
            </div>
          </div>
          <div class="team-information">
            <div class="action-been-fan flex-row-end-y-center" v-on:click="fetchToFavourite">
              <img src="../../../assets/action_join.png" class="action-been-fan-icon">
              加入{{teamName}}的球迷圈
            </div>
            <table class="team-information-table">
              <tr class="team-information-line">
                <td class="team-information-item">成 立: {{startTime}}</td>
                <td class="team-information-item">国 家 和 地 区: {{teamCountry}}</td>
              </tr>
              <tr class="team-information-line">
                <td class="team-information-item">城 市: {{teamCity}}</td>
                <td class="team-information-item">主 场: {{homeCourt}}</td>
              </tr>
              <tr class="team-information-line">
                <td class="team-information-item">地 址: {{teamAddress}}</td>
              </tr>
            </table>
            <!-- <el-amap
              class="map"
              :vid="amap-vue"
              :mapStyle="dark"
              :amap-manager="amapManager"
              :center="center"
              :zoom="zoom"
              :events="events"
            ></el-amap>-->
          </div>
        </div>
        <div class="team-schedule">
          <div class="team-schedule-title">
            {{teamName}}赛程
            <span
              class="handle-btn"
              id="next"
              v-on:click="pagingFun"
              v-if="page+1 != Math.ceil((schedule.length / 6))"
            >下一页</span>
            <span class="handle-btn" id="previous" v-on:click="pagingFun" v-if="page != 0">上一页</span>
          </div>
          <div class="team-schedule-content">
            <div
              class="team-schedule-item flex-row"
              v-for="(item,index) in scheduleList"
              v-bind:key="index"
            >
              <div class="team-schedule-type">{{item.matchType}}</div>
              <div class="team-schedule-match flex-row">
                <div class="team-schedule-name">{{item.homeTeamName}}</div>
                <img class="team-schedule-icon" :src="item.homeTeamIcon" :alt="item.homeTeamName">
                <div class="team-schedule-score" v-if="item.homeScore != ''">{{item.homeScore}}</div>
                <div v-if="item.homeScore != ''">:</div>
                <div v-else class="team-schedule-line">—</div>
                <div class="team-schedule-score" v-if="item.awayScore != ''">{{item.awayScore}}</div>
                <img class="team-schedule-icon" :src="item.awayTeamIcon" :alt="item.awayTeamName">
                <div class="team-schedule-name-away">{{item.awayTeamName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="team-honour">
        <div class="team-honour-title">球队荣誉</div>
        <div
          v-for="(item,index) in honourList"
          v-bind:key="index"
          class="flex-row-y-center team-honour-item"
        >
          <div class="flex-row-y-center team-honour-item-left">
            <img :src="item.title" class="honour-img">
            <div class="team-honour-green-text">{{item.name}}</div>
          </div>
          <div class="team-honour-green-text">x {{item.times}}</div>
          <div class="team-honour-item-right">
            <div
              class="season"
              v-for="(innerItem,innerIndex) in item.sessionList"
              v-bind:key="innerIndex"
            >{{innerItem}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="team-content" v-if="currentIndex == 1">
      <!-- <div class="team-banner"></div> -->
      <div class="team-list">
        <div class="title">{{teamName}}球员名单</div>
        <div class="team-member flex-column">
          <div class="team-member-tab flex-row">
            <div class="team-member-position">位置</div>
            <div class="team-member-number">号码</div>
            <div class="team-member-name" id="player-name">姓名</div>
            <div class="team-member-enter">出场</div>
            <div class="team-member-score">进球</div>
            <div class="team-member-flag">国籍</div>
          </div>
          <div
            class="team-member-item flex-row"
            v-for="(item, index) in teamMember"
            v-bind:key="index"
            :class="[index % 2 === 0?'light-bg':'dark-bg']"
          >
            <div class="team-member-position flex-row-center">{{item.playerLocation}}</div>
            <div class="team-member-number flex-row-center">{{item.playerNum}}</div>
            <div
              class="team-member-name flex-row-y-center"
              v-on:click="jumpPlayerData(item.playerName)"
            >
              <img :src="item.playerIcon" class="player-icon">
              {{item.playerName}}
            </div>
            <div class="team-member-enter flex-row-center">{{item.playerEnterNum}}</div>
            <div class="team-member-score flex-row-center">{{item.playerScoreNum}}</div>
            <div class="team-member-flag flex-row-center">
              <img :src="item.playerNationFlag" class="play-flag">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "teamPage",
  components: {},
  props: {},
  data() {
    return {
      teamName: undefined,
      teamNickName: undefined,
      teamIcon: undefined,
      nationalFlag: undefined,
      startTime: undefined,
      teamCountry: undefined,
      teamCity: undefined,
      homeCourt: undefined,
      teamMember: undefined,
      honourList: undefined,
      teamAddress: undefined,
      homeMatchList: undefined,
      awayMatchList: undefined,
      schedule: [],
      pageNum: 10,
      teamGrade: [],
      scheduleList: [],
      page: 0,
      tabList: ["球队信息", "球员列表"],
      currentIndex: 0
    };
  },
  watch: {
    page: function() {
      this.scheduleList = this.schedule.slice(
        this.page * 6,
        (this.page + 1) * 6
      );
    }
  },
  computed: {
    ...mapState(["userName", "isLogin"])
  },
  methods: {
    getTeamInfo(teamName) {
      this.$http
        .post("/api/data/getTeamInfo", {
          teamName: teamName
        })
        .then(res => {
          const data = res.data.data;
          this.teamNickName = data.teamInfo.teamTitle;
          this.teamIcon = data.teamInfo.teamIcon;
          this.nationalFlag = data.teamInfo.nationalFlag;
          this.schedule = data.schedule;
          this.startTime = data.teamInfo.startTime;
          this.teamCountry = data.teamInfo.teamCountry;
          this.teamCity = data.teamInfo.teamCity;
          this.homeCourt = data.teamInfo.homeCourt;
          this.teamAddress = data.teamInfo.teamAddress;
          this.teamMember = data.teamMember;
          this.honourList = data.honourList;
          this.scheduleList = this.schedule.slice(0, 6);
          this.getGradeFluctuate(this.schedule);
        });
    },
    actionNextPage() {},
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    getGradeFluctuate(matchList) {
      matchList.forEach(element => {
        if (element.awayScore !== "" && element.homeScore !== "") {
          if (element.awayScore === element.homeScore) {
            this.teamGrade.push("1");
          } else if (element.homeScore > element.awayScore) {
            if (element.homeTeamName === this.teamName) {
              this.teamGrade.push("2");
            } else {
              this.teamGrade.push("0");
            }
          } else {
            if (element.homeTeamName === this.teamName) {
              this.teamGrade.push("0");
            } else {
              this.teamGrade.push("2");
            }
          }
        }
      });
      this.drawTeamScheduleChart(this.teamGrade);
    },
    drawTeamScheduleChart(data) {
      const teamData = data;
      let teamScheduleChart = this.$echarts.init(
        document.getElementById("teamScheduleChart")
      );
      teamScheduleChart.setOption({
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function(value) {
              let texts = [];
              if (value === 0) {
                texts.push("负");
              } else if (value === 1) {
                texts.push("平");
              } else if (value === 2) {
                texts.push("胜");
              }
              return texts;
            }
          }
        },
        series: [
          {
            data: teamData,
            type: "line"
          }
        ]
      });
    },
    getBgColor(index) {
      if (index % 2 === 0) {
        return "tr-even-number";
      } else {
        return "tr-odd-number";
      }
    },
    pagingFun(ev) {
      const currentType = ev.currentTarget.id;
      currentType === "next" ? this.page++ : this.page--;
    },
    actionJumpBI() {
      this.$router.push({
        path: "/data/bi",
        query: {
          teamName: this.teamName
        }
      });
    },
    fetchToFavourite() {
      if (this.isLogin === false) {
        this.$message({
          message: "请先登陆再进行操作哦～",
          type: "error"
        });
        return;
      }
      this.$http
        .post("/api/team/favourite", {
          userName: this.userName,
          teamName: this.teamName
        })
        .then(res => {
          const data = res.data.data;
          if (data.state === true) {
            this.$message({
              message: `${data.msg}`,
              type: "success"
            });
          } else {
            this.$message({
              message: `${data.msg}`,
              type: "error"
            });
          }
        });
    },
    /**
     * 获取地址横纵坐标
     */
    getLocation() {
      this.$http
        .get("/baiduMap/", {
          params: {
            address: this.teamAddress,
            output: "json",
            ak: "oyZk9cTfjcLIgKhbwzeeXC8YD3T2lZCk"
          }
        })
        .then(res => {
          const locationRes = res.data.result.location;
          console.log("经纬度", locationRes);
          this.center[0] = locationRes.lng;
          this.center[1] = locationRes.lat;
        });
    },
    jumpPlayerData(playerName) {
      this.$router.push({
        path: "/data/player",
        query: {
          playerName: playerName
        }
      });
    },
    handler({ BMap, map }) {
      this.location.lng = 16.45359;
      this.location.lat = 39.936982;
    }
  },
  created() {
    this.teamName = this.$route.query.teamName;
    this.getTeamInfo(this.teamName);
  },
  mounted() {}
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
}
.team-switch-tab {
  width: 60px;
  height: auto;
  min-height: calc(100vh - 80px);
  background-color: rgba(82, 173, 75, 1);
  border-top: 1px solid #eeeeee;
}
.team-switch-tab-item {
  width: 100%;
  color: white;
  text-align: center;
  padding: 30px 0px;
}
.team-switch-tab-item-activity {
  width: 100%;
  color: white;
  text-align: center;
  padding: 30px 0px;
  background-color: #2e8b57;
}
.team-content {
  width: calc(100vw - 60px);
  height: auto;
}
.team-info {
  width: 25vw;
  margin-left: 50px;
  margin-top: 20px;
  background-color: white;
}
.team-detail {
  margin-left: 30px;
}
.team-name {
  color: gray;
  font-size: 22px;
}
.team-nick-name {
  color: gray;
  font-size: 16px;
}
.team-icon {
  width: 100px;
  height: 100px;
}
.team-flag {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.team-chart-btn {
  text-align: center;
  color: gray;
  font-size: 10px;
  border: 1px solid gray;
  padding: 5px 20px;
  border-radius: 10px;
  margin-top: 15px;
}
.team-chart-btn:hover {
  text-align: center;
  color: white;
  font-size: 10px;
  background-color: rgb(82, 173, 75);
  border: 1px solid gray;
  padding: 5px 20px;
  border-radius: 10px;
  margin-top: 15px;
}
.team-information {
  width: 25vw;
  margin-left: 30px;
}
.team-information-table {
  margin-top: 20px;
}
.team-page-row {
  width: 25vw;
  height: 30px;
  line-height: 55px;
  display: inline-block;
}
.action-been-fan {
  text-align: end;
  padding-top: 15px;
  font-size: 16px;
  color: red;
  font-weight: 500;
  cursor: pointer;
}
.action-been-fan-icon {
  width: 22px;
  height: 22px;
}
.team-information-item {
  width: 12.5vw;
  height: 30px;
  color: grey;
}
.team-schedule {
  margin-left: 20px;
  margin-top: 30px;
  width: 35vw;
  float: left;
}
.team-schedule-item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 10px 0px;
  padding: 10px 0px;
  border-bottom: 1px solid #eeeeee;
}
.team-schedule-type {
  font-size: 13px;
  color: #333;
  width: 20%;
  text-align: end;
}
.team-schedule-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background-color: #2e8b57;
  color: white;
}
.team-schedule-title span {
  float: right;
  font-size: 14px;
  width: 100px;
  text-align: center;
}
.team-schedule-match {
  width: 70%;
  margin-left: 10%;
}
.team-schedule-icon {
  width: 30px;
  height: 30px;
  color: gray;
}
.map {
  width: 300px;
  height: 300px;
}
.team-honour-title {
  max-width: 70vw;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #2e8b57;
  margin-top: 20px;
}
.team-honour-item {
  padding: 10px 20px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #eeeeee;
  width: auto;
  max-width: 70vw;
}
#player-name {
  text-align: start;
}
.team-honour-item-left {
  width: 15vw;
}
.team-honour-item-right {
  width: 40vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
}
.honour-img {
  width: 40px;
  height: 40px;
}
.team-honour-green-text {
  font-size: 14px;
  color: #2e8b57;
}
.team-honour-green-text:nth-of-type(2) {
  margin-left: 20px;
}
.season {
  font-size: 14px;
  color: #2e8b57;
  margin-left: 20px;
}
.team-list {
  width: auto;
  height: auto;
  max-width: 60vw;
  margin-left: 40px;
  margin-top: 40px;
}
.title {
  width: 100%;
  height: 60px;
  font-size: 16px;
}
.team-member {
  width: 100%;
}
.team-member-tab {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  background-color: #2e8b57;
}
.team-member-position {
  width: 10%;
}
.team-member-number {
  width: 10%;
}
.team-member-name {
  width: 50%;
  cursor: pointer;
}
.team-member-enter,
.team-member-score,
.team-member-flag {
  width: 10%;
}
.team-member-item {
  width: 100%;
  padding: 5px 0px;
}
.light-bg {
  background-color: rgba(82, 173, 75, 0.15);
  font-size: 16px;
}
.dark-bg {
  background-color: rgba(82, 173, 75, 0.8);
  color: white;
  font-size: 18px;
}
.player-icon {
  width: 50px;
  height: 50px;
  margin-right: 30px;
}
.play-flag {
  width: 25px;
  height: 25px;
}
.team-schedule {
  margin-left: 20px;
  margin-top: 30px;
  width: 35vw;
  float: left;
}
.team-schedule-item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 10px 0px;
}
.team-schedule-type {
  font-size: 13px;
  color: #333;
  width: 20%;
  text-align: end;
}
.team-schedule-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background-color: #2e8b57;
  color: white;
}
.team-schedule-title span {
  float: right;
  font-size: 14px;
  width: 100px;
  text-align: center;
}
.team-schedule-match {
  width: 70%;
  margin-left: 10%;
}
.team-schedule-icon {
  width: 30px;
  height: 30px;
}
.team-schedule-name {
  font-size: 13px;
  color: #333;
  width: 30%;
  text-align: end;
  margin: 0px 10px;
}
.team-schedule-name-away {
  font-size: 13px;
  width: 30%;
  color: #333;
  text-align: start;
  margin: 0px 10px;
}
.team-schedule-score {
  font-size: 15px;
  color: gray;
  margin: 0px 10px;
}
.team-schedule-line {
  font-size: 15px;
  color: gray;
  margin: 0px 23px;
}
.team-schedule-content {
  border: 1px solid #eeeeee;
}
.team-banner {
  position: fixed;
  top: 85px;
  left: 67px;
  background-image: url("../../../assets/team_flag.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 40%;
  z-index: -1;
}
.bg {
  width: 100%;
}
</style>
