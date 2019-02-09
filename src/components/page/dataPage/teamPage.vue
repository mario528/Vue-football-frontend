<template>
  <div class="app flex-row">
    <div class="team-page-left flex-column">
      <div class="team-detail flex-cloumn-x-center">
        <div class="flex-row">
          <div class="team-icon-area">
            <img :src="teamIcon" class="team-icon-big">
          </div>
          <div class="team-title">
            <div class="flex-row-y-center">
              <div class="team-name">{{teamName}}</div>
              <img :src="nationalFlag" class="national-flag">
            </div>
            <div class="team-nickname">{{teamNickName}}</div>
          </div>
        </div>
        <div class="team-infomation flex-column">
          <div class="team-infomation-line flex-row-space-between">
            <div class="team-infomation-item flex-row-y-center">
              <span class="team-infomation-title">成 立:</span>
              <span class="team-infomation-content">{{startTime}}</span>
            </div>
            <div class="team-infomation-item flex-row-y-center">
              <span class="team-infomation-title">国 家 和 地 区:</span>
              <span class="team-infomation-content">{{teamCountry}}</span>
            </div>
          </div>
          <div class="team-infomation-line flex-row-space-between">
            <div class="team-infomation-item flex-row-y-center">
              <span class="team-infomation-title">城 市:</span>
              <span class="team-infomation-content">{{teamCity}}</span>
            </div>
            <div class="team-infomation-item flex-row-y-center">
              <span class="team-infomation-title">主 场:</span>
              <span class="team-infomation-content">{{homeCourt}}</span>
            </div>
          </div>
          <div class="team-infomation-line flex-row-space-between">
            <div class="team-infomation-item flex-row-y-center">
              <span class="team-infomation-title">地 址:</span>
              <span class="team-infomation-content">{{teamAddress}}</span>
            </div>
          </div>
        </div>
        <div class="schedule">
          <div class="schedule-title">球队近期赛程</div>
          <div class="schedule-box" v-for="(item,index) in schedule" v-bind:key="index">
            <div v-if="index < pageNum" class="flex-row">
              <div class="match-type flex-row-center">{{item.matchType}}</div>
              <div class="homeTeam flex-row-center">
                <div class="schedule-team-name flex-row-x-center">{{item.homeTeamName}}</div>
                <img :src="item.homeTeamIcon" class="team-icon">
              </div>
              <div class="score flex-row-center">{{item.homeScore}} - {{item.awayScore}}</div>
              <div class="awayTeam flex-row-y-center">
                <img :src="item.awayTeamIcon" class="team-icon">
                <div class="schedule-team-name flex-row-x-center">{{item.awayTeamName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="team-member">
      <div class="team-member-tab">球队阵容-</div>
      <table>
        <tr>
          <th class="team-member-header">位置</th>
          <th class="team-member-header">号码</th>
          <th class="team-member-header">姓名</th>
          <th class="team-member-header">出场</th>
          <th class="team-member-header">进球</th>
          <th class="team-member-header">国籍</th>
        </tr>
        <tr v-for="(item,index) in teamMember" v-bind:key="index" :class="getBgColor(index)">
          <td class="team-member-item-sort">{{item.playerLocation}}</td>
          <td class="team-member-item-sort">{{item.playerNum}}</td>
          <td class="team-member-item-long">
            <span>
              <img :src="item.playerIcon" class="team-member-icon">
            </span>
            <span>{{item.playerName}}</span>
          </td>
          <td class="team-member-item-sort">{{item.playerEnterNum}}</td>
          <td class="team-member-item-sort">{{item.playerScoreNum}}</td>
          <td class="team-member-item-sort">
            <img :src="item.playerNationFlag" class="team-member-icon">
          </td>
        </tr>
      </table>
    </div>
    <!-- <div class="team-schedule-chart">
      <div id="teamScheduleChart" :style="{width: '300px', height: '300px'}"></div>
    </div>-->
  </div>
</template>

<script>
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
      schedule: [],
      pageNum: 10,
      teamGrade: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTeamInfo(teamName) {
      this.$http
        .post("/api/data/getTeamInfo", {
          teamName: teamName
        })
        .then(res => {
          this.teamNickName = res.data.teamTitle;
          this.teamIcon = res.data.teamIcon;
          this.nationalFlag = res.data.nationalFlag;
          this.schedule = res.data.schedule;
          this.startTime = res.data.startTime;
          this.teamCountry = res.data.teamCountry;
          this.teamCity = res.data.teamCity;
          this.homeCourt = res.data.homeCourt;
          this.teamAddress = res.data.teamAddress;
          this.teamMember = res.data.teamMember;
          this.getGradeFluctuate(this.schedule);
        });
    },
    actionNextPage() {},
    getGradeFluctuate(matchList) {
      matchList.forEach(element => {
        if (element.awayScore != "" && element.homeScore != "") {
          if (element.awayScore == element.homeScore) {
            this.teamGrade.push("1");
          } else if (element.homeScore > element.awayScore) {
            if (element.homeTeamName == this.teamName) {
              this.teamGrade.push("2");
            } else {
              this.teamGrade.push("0");
            }
          } else {
            if (element.homeTeamName == this.teamName) {
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
              if (value == 0) {
                texts.push("负");
              } else if (value == 1) {
                texts.push("平");
              } else if (value == 2) {
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
      if (index % 2 == 0) {
        return "tr-even-number";
      } else {
        return "tr-odd-number";
      }
    }
  },
  created() {
    this.teamName = this.$route.query.teamName;
  },
  mounted() {
    this.getTeamInfo(this.teamName);
  }
};
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
.team-detail {
  padding-top: 20px;
}
.schedule {
  width: 40vw;
  margin-left: 30px;
}
.team-title {
  margin-left: 30px;
}
.national-flag {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.team-name {
  font-size: 30px;
  font-weight: 500;
  color: black;
}
.team-icon-big {
  width: 120px;
  height: 120px;
  margin-left: 30px;
}
.team-nickname {
  color: grey;
  font-size: 16px;
  margin-top: 5px;
}
.team-icon {
  width: 30px;
  height: 30px;
  margin: 0px 5px 0px 5px;
}
.schedule-box {
  margin-top: 10px;
}
.schedule-title {
  font-size: 16px;
  padding: 10px 0px 10px 0px;
  margin-left: 30px;
}
.match-type {
  width: 60px;
}
.homeTeam {
  width: 120px;
}
.score {
  width: 70px;
}
.awayTeam {
  width: 120px;
}
.schedule-team-name {
  width: 80px;
}
.team-infomation {
  width: 40vw;
  margin-top: 20px;
}
.team-infomation-line {
  width: 100%;
  margin-top: 20px;
  margin-left: 30px;
}
.team-infomation-line:nth-child(1) {
  margin-top: 0px;
}
.team-infomation-item {
  width: 20vw;
}
.team-infomation-title {
  font-size: 14px;
  font-weight: 500;
  color: grey;
}
.team-infomation-content {
  font-size: 14px;
  font-weight: 500;
  color: grey;
  margin-left: 20px;
}
.team-member-header {
  width: 6vw;
  background-color: rgb(82, 173, 75);
  color: white;
  margin: 0px;
  padding: 0px;
}
.team-member-item-sort {
  width: 30px;
  text-align: center;
}
.team-member-item-long {
  width: 180px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-content: center;
}
.team-member-item-long span {
  width: 150px;
  height: 35px;
  line-height: 35px;
}
.team-member-item-long span:nth-child(1) {
  width: 30px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.team-member-item-long span img {
  margin-top: 2.5px;
}
.team-member-icon {
  width: 30px;
  height: 30px;
}
.tr-even-number {
  background-color: white;
  color: rgb(82, 173, 75);
  font-size: 10px;
}
.tr-odd-number {
  background-color: rgb(82, 173, 75);
  color: white;
}
.team-member-tab {
  width: 100%;
  color: white;
  background-color: rgb(82, 173, 75);
}
</style>