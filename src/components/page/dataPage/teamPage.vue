<template>
  <div class="app flex-row-x-center">
    <div class="team-page-header flex-row-y-center">
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
          <div class="team-chart-btn">数据可视化展示</div>
        </div>
      </div>
      <div class="team-page-detail">
        <div class="team-page-row flex-row-y-center">
          <span class="team-infomation-title">成 立:</span>
          <span class="team-infomation-content">{{startTime}}</span>
        </div>
        <div class="team-page-row flex-row-y-center">
          <span class="team-infomation-title">国 家 和 地 区:</span>
          <span class="team-infomation-content">{{teamCountry}}</span>
        </div>
        <div class="team-page-row flex-row-y-center">
          <span class="team-infomation-title">城 市:</span>
          <span class="team-infomation-content">{{teamCity}}</span>
        </div>
        <div class="team-page-row flex-row-y-center">
          <span class="team-infomation-title">主 场:</span>
          <span class="team-infomation-content">{{homeCourt}}</span>
        </div>
        <div class="team-page-row flex-row-y-center">
          <span class="team-infomation-title">地 址:</span>
          <span class="team-infomation-content">{{teamAddress}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      teamGrade: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    getTeamInfo (teamName) {
      this.$http
        .post('/api/data/getTeamInfo', {
          teamName: teamName
        })
        .then(res => {
          this.teamNickName = res.data.teamTitle
          this.teamIcon = res.data.teamIcon
          this.nationalFlag = res.data.nationalFlag
          this.schedule = res.data.schedule
          this.startTime = res.data.startTime
          this.teamCountry = res.data.teamCountry
          this.teamCity = res.data.teamCity
          this.homeCourt = res.data.homeCourt
          this.teamAddress = res.data.teamAddress
          this.teamMember = res.data.teamMember
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
  height: 100vh;
}
.team-page-header {
  width: 90vw;
  height: 110px;
  margin-top: 30px;
}
.team-page-icon {
  width: 20vw;
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
  padding: 2px;
  margin-top: 15px;
}
.team-page-detail {
  width: 60vw;
  height: 110px;
  background-color: palegoldenrod;
  margin-left: 10vw;
}
.team-page-row {
  width: 12vw;
  height: 55px;
  line-height: 55px;
  display: inline-block;
}
.team-infomation-title {
    height: 55px;
  font-size: 12px;
  color: grey;
}
</style>
