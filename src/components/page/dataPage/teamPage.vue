<template>
  <div class="app">
    <div style="float:left">
      <div class="team-page-header flex-row-center">
        <div class="team-page-icon flex-row-center">
          <div class="team-image flex-row-y-center">
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
      </div>
      <baidu-map
      class="map"
      :center="teamCity"
      :zoom="zoom"
      ak="oyZk9cTfjcLIgKhbwzeeXC8YD3T2lZCk"
      @ready="handler"
    ></baidu-map>
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
    <div class="team-member flex-column">
      <div class="team-member-tab flex-row">
        <div class="team-member-position">位置</div>
        <div class="team-member-number">号码</div>
        <div class="team-member-name">姓名</div>
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
        <div class="team-member-name flex-row-y-center">
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
</template>

<script>
import { mapState } from 'vuex'
import styleJson from '@/assets/file/mapStyle'
export default {
  name: 'teamPage',
  components: {},
  props: {},
  data () {
    return {
      teamName: undefined,
      teamNickName: undefined,
      teamIcon: undefined,
      nationalFlag: undefined,
      schedule: [],
      pageNum: 10,
      teamGrade: [],
      scheduleList: [],
      page: 0,
      styleJson: styleJson,
      location: {
        lng: 116.453590,
        lat: 39.936982
      }
    }
  },
  watch: {
    page: function () {
      this.scheduleList = this.schedule.slice(
        this.page * 6,
        (this.page + 1) * 6
      )
    }
  },
  computed: {
    ...mapState(['userName', 'isLogin'])
  },
  methods: {
    getTeamInfo (teamName) {
      this.$http
        .post('/api/data/getTeamInfo', {
          teamName: teamName
        })
        .then(res => {
          const data = res.data.data
          this.teamNickName = data.teamInfo.teamTitle
          this.teamIcon = data.teamInfo.teamIcon
          this.nationalFlag = data.teamInfo.nationalFlag
          this.schedule = data.schedule
          this.startTime = data.teamInfo.startTime
          this.teamCountry = data.teamInfo.teamCountry
          this.teamCity = data.teamInfo.teamCity
          this.homeCourt = data.teamInfo.homeCourt
          this.teamAddress = data.teamInfo.teamAddress
          this.teamMember = data.teamMember
          this.scheduleList = this.schedule.slice(0, 6)
          this.getGradeFluctuate(this.schedule)
        })
    },
    actionNextPage () {},
    getGradeFluctuate (matchList) {
      matchList.forEach(element => {
        if (element.awayScore !== '' && element.homeScore !== '') {
          if (element.awayScore === element.homeScore) {
            this.teamGrade.push('1')
          } else if (element.homeScore > element.awayScore) {
            if (element.homeTeamName === this.teamName) {
              this.teamGrade.push('2')
            } else {
              this.teamGrade.push('0')
            }
          } else {
            if (element.homeTeamName === this.teamName) {
              this.teamGrade.push('0')
            } else {
              this.teamGrade.push('2')
            }
          }
        }
      })
      this.drawTeamScheduleChart(this.teamGrade)
    },
    drawTeamScheduleChart (data) {
      const teamData = data
      let teamScheduleChart = this.$echarts.init(
        document.getElementById('teamScheduleChart')
      )
      teamScheduleChart.setOption({
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              let texts = []
              if (value === 0) {
                texts.push('负')
              } else if (value === 1) {
                texts.push('平')
              } else if (value === 2) {
                texts.push('胜')
              }
              return texts
            }
          }
        },
        series: [
          {
            data: teamData,
            type: 'line'
          }
        ]
      })
    },
    getBgColor (index) {
      if (index % 2 === 0) {
        return 'tr-even-number'
      } else {
        return 'tr-odd-number'
      }
    },
    pagingFun (ev) {
      const currentType = ev.currentTarget.id
      currentType === 'next' ? this.page++ : this.page--
    },
    actionJumpBI () {
      this.$router.push({
        path: '/data/bi',
        query: {
          teamName: this.teamName
        }
      })
    },
    fetchToFavourite () {
      if (this.isLogin === false) {
        this.$message({
          message: '请先登陆再进行操作哦～',
          type: 'error'
        })
        return
      }
      this.$http
        .post('/api/team/favourite', {
          userName: this.userName,
          teamName: this.teamName
        })
        .then(res => {
          const data = res.data.data
          if (data.state === true) {
            this.$message({
              message: `${data.msg}`,
              type: 'success'
            })
          } else {
            this.$message({
              message: `${data.msg}`,
              type: 'error'
            })
          }
        })
    },
    /**
     * 获取地址横纵坐标
    */
    getLocation () {
      const baseUrl = 'http://api.map.baidu.com/geocoder/v2/'
      this.$http.get(this.baseUrl, {
        params: {
          address: this.homeCourt,
          output: 'json',
          ak: 'oyZk9cTfjcLIgKhbwzeeXC8YD3T2lZCk'
        }
      }).then((res) => {
        console.log(res)
      })
    },
    handler () {
      this.location.lng = 16.453590
      this.location.lat = 39.936982
    }
  },
  created () {
    this.teamName = this.$route.query.teamName
  },
  mounted () {
    this.getTeamInfo(this.teamName)
  }
}
</script>
<style scoped>
.app {
  width: 100vw;
  height: auto;
}
.team-page-header {
  width: 25vw;
  height: 110px;
  margin-top: 30px;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
}
.team-page-icon {
  width: 20vw;
  height: auto;
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
.team-detail {
  margin-left: 10px;
}
.team-name {
  color: gray;
  font-size: 22px;
}
.team-nick-name {
  color: gray;
  font-size: 16px;
}
.team-chart-btn {
  text-align: center;
  color: gray;
  font-size: 10px;
  border: 1px solid gray;
  padding: 5px 20px;
  border-radius: 10px;
  margin-top: 5px;
}
.team-chart-btn:hover {
  text-align: center;
  color: white;
  font-size: 10px;
  background-color: rgb(82, 173, 75);
  border: 1px solid gray;
  padding: 5px 20px;
  border-radius: 10px;
  margin-top: 5px;
}
.team-page-detail {
  width: 60vw;
  height: 110px;
  background-color: palegoldenrod;
  margin-left: 10vw;
}
.team-information {
  width: 25vw;
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
  background-color: rgb(82, 173, 75);
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
.handle-btn:nth-of-type(1) {
  border-left: 1px solid white;
}
.team-member {
  width: 35vw;
  margin-top: 30px;
  padding-left: 3vw;
}
.player-icon {
  width: 40px;
  height: 40px;
}
.play-flag {
  width: 25px;
  height: 25px;
}
.team-member-tab {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 30px;
  font-size: 14px;
  background-color: rgb(82, 173, 75);
}
.team-member-position {
  width: 10%;
}
.team-member-number {
  width: 10%;
}
.team-member-name {
  width: 50%;
}
.team-member-enter {
  width: 10%;
}
.team-member-score {
  width: 10%;
}
.team-member-flag {
  width: 10%;
}
.light-bg {
  background-color: white;
}
.dark-bg {
  background-color: rgb(82, 173, 75);
  color: white;
}
.map {
  width: 300px;
  height: 300px;
  float: left;
}
</style>
