<template>
  <div class="app">
    <div class="bi-title flex-row">
      <div class="company-detail flex-row-y-center">
        <img class="company-icon" src="../../../assets/compony_icon.png">
        <div class="company-title" v-on:click="handleCommand('home')">懂球吗</div>
      </div>
      <span class="BI-center">{{teamName}}数据化可视界面</span>
    </div>
    <div class="team-info flex-column-center">
      <div class="flex-row-y-center">
        <img class="team-info-icon" :src="teamIcon">
        <div class="flex-column-center">
          <span class="team-info-font">{{teamName}}</span>
          <span class="team-info-font nick-name">{{teamNickName}}</span>
        </div>
      </div>
      <div class="team-near-grade flex-column-x-center">
        <span class="team-near-grade-title">近5场比赛结果</span>
        <div class="team-near-grade-row">
          <span
            :class="[item==='负' ? 'team-near-grade-lost recent-grade-span': item === '平' ? 'team-near-grade-draw recent-grade-span' : item === '胜' ? 'team-near-grade-win recent-grade-span' : '' ]"
            v-for="(item,index) in recentGrade"
            v-bind:key="index"
          >{{item}}</span>
        </div>
      </div>
    </div>
    <div class="team-combatGains">
      <div id="team-combatGains-charts" :style="{width: '40vw', height: '20vw'}"></div>
    </div>
    <div class="team-small-center">
      <div id="team-grade-charts" :style="{width: '30vw', height: '20vw'}"></div>
    </div>
    <div class="team-member-charts">
      <div id="team-member-charts" :style="{width: '40vw', height: '20vw'}"></div>
    </div>
    <div class="team-average-age">
      <div style="color:'#fff'">球员平均年龄为{{teamAverageAge}}</div>Ï
      <div id="team-average-age-charts" :style="{width: '40vw', height: '20vw'}"></div>
    </div>
    <div class="team-home-away-grade">
      <div id="team-home-charts" :style="{width: '20vw', height: '20vw'}"></div>
      <div id="team-away-charts" :style="{width: '20vw', height: '20vw'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamDataCharts",
  components: {},
  props: {},
  data() {
    return {
      teamName: "",
      teamIcon: "",
      combatGains: [],
      recentGrade: [],
      teamAverageAge: 0,
      teamNickName: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTeamInfo(teamName) {
      this.$http
        .post("/api/data/getTeamData", {
          teamName: teamName
        })
        .then(res => {
          const data = res.data.data;
          this.schedule = data.schedule;
          this.teamNickName = data.teamInfo.teamTitle;
          this.teamIcon = data.teamInfo.teamIcon;
          this.teamMember = data.teamMember;
          this.combatGains = data.combatGains;
          this.playerDetail = data.playerDetail;
        })
        .then(() => {
          this.drawTeamCount(this.combatGains);
          this.getRecentGrade(this.combatGains);
          this.getTeamAverageAge(this.playerDetail);
          let teamConstitute = this.getTeamConstitute(this.teamMember);
          this.drawTeamConstitute(teamConstitute);
          this.drawTeamAverageAgeScatter(this.playerDetail);
          this.homeMatchList = this.getMatchList(0);
          this.awayMatchList = this.getMatchList(1);
          this.homeGrade = this.getMatchGrade(this.homeMatchList, 0);
          this.awayGrade = this.getMatchGrade(this.awayMatchList, 1);
          this.drawTeamGrade();
          const homeData = [
            { value: this.homeGrade.won, name: "胜" },
            { value: this.homeGrade.draw, name: "平" },
            { value: this.homeGrade.lose, name: "负" }
          ];
          const awayData = [
            { value: this.awayGrade.won, name: "胜" },
            { value: this.awayGrade.draw, name: "平" },
            { value: this.awayGrade.lose, name: "负" }
          ];
          this.drawCriclCharts("team-home-charts", homeData, 0);
          this.drawCriclCharts("team-away-charts", awayData, 1);
        });
    },
    drawTeamCount(data) {
      let teamScheduleChart = this.$echarts.init(
        document.getElementById("team-combatGains-charts")
      );
      teamScheduleChart.setOption({
        title: {
          text: `${this.teamName}近${data.length}场比赛的成绩折线图`,
          textStyle: {
            color: "#fff",
            fontWeight: "500"
          }
        },
        xAxis: {
          type: "category",
          name: "场次",
          minInterval: 1,
          data: ""
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function(value) {
              var texts = [];
              if (value === 0) {
                texts.push("负");
              } else if (value === 1) {
                texts.push("平");
              } else if (value === 2) {
                texts.push("胜");
              }
              return texts;
            }
          },
          nameTextStyle: {
            color: ["#fff"]
          }
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#fff",
              width: 5
            }
          }
        ]
      });
    },
    drawTeamGrade() {
      const data = [];
      data.push(this.homeGrade.score);
      data.push(this.homeGrade.loseBall);
      data.push(this.awayGrade.score);
      data.push(this.awayGrade.loseBall);
      let teamGradeChart = this.$echarts.init(
        document.getElementById("team-grade-charts")
      );
      teamGradeChart.setOption({
        title: {
          text: `${this.teamName}主客场进球柱状图`,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["进球", "失球"],
          top: "5",
          left: "300",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: function(data) {
                return Math.abs(data);
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["主场", "客场"],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "进球",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true
              },
              color: "#fff"
            },
            barWidth: "50",
            data: [this.homeGrade.score, this.awayGrade.score]
          },
          {
            name: "失球",
            type: "bar",
            stack: "总量",
            color: "#9ACD32",
            label: {
              normal: {
                show: true
              },
              formatter: function(data) {
                return Math.abs(data);
              }
            },
            data: [-this.homeGrade.loseBall, -this.awayGrade.loseBall]
          }
        ]
      });
    },
    getTeamAverageAge(data) {
      data.forEach(element => {
        this.teamAverageAge += Number(element.playerAge);
      });
      this.teamAverageAge = this.teamAverageAge / data.length;
    },
    drawTeamAverageAgeScatter(data) {
      let list = [];
      data.forEach((element, idx) => {
        list[idx] = [idx + 1, Number(element.playerAge)];
      });
      let teamAgeChart = this.$echarts.init(
        document.getElementById("team-average-age-charts")
      );
      teamAgeChart.setOption({
        title: {
          text: `${this.teamName}球员年龄分布`,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: list,
            type: "scatter"
          }
        ]
      });
    },
    getRecentGrade(data) {
      console.log(data);
      data.splice(data.length - 5).forEach((element, index) => {
        if (element === "0") {
          this.recentGrade.push("负");
        } else if (element === "1") {
          this.recentGrade.push("平");
        } else if (element === "2") {
          this.recentGrade.push("胜");
        }
      });
    },
    getTeamConstitute(teamList) {
      let teamConstitute = [];
      let coachNum = 0;
      let goalKeeper = 0;
      let defendersNum = 0;
      let middlerNum = 0;
      let forwardNum = 0;
      teamList.forEach(element => {
        if (
          element.playerLocation === "助理教练" ||
          element.playerLocation === "教练"
        ) {
          coachNum++;
        } else if (element.playerLocation === "守门员") {
          goalKeeper++;
        } else if (element.playerLocation === "后卫") {
          defendersNum++;
        } else if (element.playerLocation === "中场") {
          middlerNum++;
        } else if (element.playerLocation === "前锋") {
          forwardNum++;
        }
      });
      teamConstitute.push(
        { value: coachNum, name: "教练组" },
        { value: goalKeeper, name: "守门员" },
        { value: defendersNum, name: "后卫" },
        { value: middlerNum, name: "中场" },
        { value: forwardNum, name: "前锋" }
      );
      return teamConstitute;
    },
    drawTeamConstitute(data) {
      let teamMemberChart = this.$echarts.init(
        document.getElementById("team-member-charts")
      );
      teamMemberChart.setOption({
        normal: {
          opacity: 0.8
        },
        title: {
          text: `${this.teamName}成员组成`,
          textStyle: {
            color: "#fff",
            fontWeight: "500"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}位 占球队的{d}%"
        },
        legend: {
          orient: "vertical",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "left",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "center",
          itemWidth: 24, // 设置图例图形的宽
          itemHeight: 18, // 设置图例图形的高
          textStyle: {
            color: "white" // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 30,
          backgroundColor: "rgb(13, 24, 64)", // 设置整个图例区域背景颜色
          data: ["教练组", "守门员", "后卫", "中场", "前锋"]
        },
        series: [
          {
            name: "球员组成",
            type: "pie",
            radius: "60%, 30%",
            data: data
          }
        ]
      });
    },
    handleCommand(url) {
      this.$router.push({
        path: url
      });
    },
    getMatchList(type) {
      // 0: 主场 1: 客场
      type = Number(type);
      const homeMatchList = [];
      const awayMatchList = [];
      this.schedule.forEach(element => {
        if (element.awayScore != "") {
          if (element.homeTeamName == this.teamName) {
            homeMatchList.push(element);
          } else {
            awayMatchList.push(element);
          }
        }
      });
      if (type == 0) {
        return homeMatchList;
      } else {
        return awayMatchList;
      }
    },
    getMatchGrade(matchList, type) {
      // type 0: 主场比赛 1: 客场比赛
      let won = 0;
      let lose = 0;
      let draw = 0;
      let score = 0;
      let loseBall = 0;
      matchList.forEach(element => {
        if (type == 0) {
          score += Number(element.homeScore);
          loseBall += Number(element.awayScore);
          if (element.homeScore > element.awayScore) {
            won++;
          } else if (element.homeScore == element.awayScore) {
            draw++;
          } else {
            lose++;
          }
        } else {
          score += Number(element.awayScore);
          loseBall += Number(element.homeScore);
          if (element.homeScore < element.awayScore) {
            won++;
          } else if (element.homeScore == element.awayScore) {
            draw++;
          } else {
            lose++;
          }
        }
      });
      const template = {
        won,
        draw,
        lose,
        score,
        loseBall
      };
      return template;
    },
    drawCriclCharts(id, data, type) {
      id = document.getElementById(id);
      let teamCriclChart = this.$echarts.init(id);
      teamCriclChart.setOption({
        title: {
          text: type == 0 ? "主场" : "客场",
          textStyle: {
            color: "#fff",
            fontSize: 40,
            fontWeight: 600
          },
          left: "100",
          top: "115"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["胜", "平", "负"]
        },
        series: [
          {
            name: "比赛结果",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      });
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
  height: auto;
  background-color: rgb(13, 24, 64);
}
.bi-title {
  width: 100vw;
  text-align: center;
  color: white;
  font-size: 22px;
  font-weight: 500;
  background-color: rgb(13, 24, 64);
}
.bi-title span {
  background-color: rgb(13, 24, 64);
  padding: 10px;
}
.team-info {
  border: 2px solid rgba(0, 0, 0, 1);
  float: left;
  width: 20vw;
  height: 20vw;
}
.team-info-icon {
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.team-combatGains {
  border: 2px solid rgba(0, 0, 0, 1);
  float: left;
  width: 40vw;
  height: 20vw;
}
.team-info-font {
  color: white;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 20px;
}
.nick-name {
  font-size: 12px;
}
#team-combatGains-charts {
  margin-top: 30px;
}
.team-small-center {
  float: left;
  border: 2px solid rgba(0, 0, 0, 1);
  width: 35vw;
  height: 20vw;
}
.team-near-grade {
  width: 100%;
  height: 5vw;
  margin-top: 60px;
}
.team-near-grade-title {
  color: white;
  font-size: 16px;
  text-align: start;
}
.team-near-grade-lost {
  padding: 5px;
  border: 1px solid rgb(82, 173, 75);
  color: rgb(82, 173, 75);
  margin: 5px;
}
.team-near-grade-draw {
  padding: 5px;
  border: 1px solid palevioletred;
  color: palevioletred;
  margin: 5px;
}
.team-near-grade-win {
  padding: 5px;
  border: 1px solid red;
  color: red;
  margin: 5px;
}
.recent-grade-span:hover {
  padding: 10px;
  font-size: 14px;
}
.team-near-grade-row {
  margin-top: 20px;
}
.company-icon {
  width: 50px;
  height: 50px;
}
.company-detail {
  cursor: pointer;
  float: left;
}
.BI-center {
  text-align: center;
  margin-left: 30vw;
}
.team-member-charts {
  float: left;
  width: 40vw;
  height: 20vw;
  border: 2px solid rgba(0, 0, 0, 1);
}
.team-average-age {
  float: left;
  width: 40vw;
  height: 20vw;
  border: 2px solid rgba(0, 0, 0, 1);
}
.team-home-away-grade {
  float: left;
  width: 50vw;
  height: 20vw;
  border: 2px solid rgba(0, 0, 0, 1);
}
.team-home-away-grade > div {
  display: inline-block;
}
</style>
