<template>
  <div class="app flex-column-x-center">
      <div class="team-detail flex-row-y-center">
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
      <div class="schedule"> 
          <div class="schedule-title">
              球队近期赛程
              <span v-on:click="actionNextPage">下一页</span>
          </div>
          <div class="schedule-box" v-for="(item,index) in schedule" v-bind:key="index">
              <div v-if="index < pageNum" class="flex-row">
                 <div class="match-type flex-row-y-center">{{item.matchType}}</div>
                 <div class="homeTeam flex-row-y-center">
                    <div>{{item.homeTeamName}}</div>
                     <img :src="item.homeTeamIcon" class="team-icon">
                 </div>
                 <div class="score flex-row-y-center">
                     {{item.homeScore}} - {{item.awayScore}}
                 </div>
                 <div class="awayTeam flex-row-y-center">
                     <img :src="item.awayTeamIcon" class="team-icon">
                     <div>{{item.awayTeamName}}</div>
                 </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'teamPage',
  components:{},
  props:{},
  data(){
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
  watch:{},
  computed:{},
  methods:{
      getTeamInfo(teamName) {
          this.$http.post('/api/data/getTeamInfo',{
              teamName: teamName
          }).then((res)=> {
              this.teamNickName = res.data.teamTitle;
              this.teamIcon = res.data.teamIcon
              this.nationalFlag = res.data.nationalFlag;
              this.schedule = res.data.schedule;
              this.getGradeFluctuate(this.schedule);
          })
      },
      actionNextPage() {
          
      },
      getGradeFluctuate(matchList) {
          matchList.forEach((element)=> {
            if(element.awayScore != '' && element.homeScore != '') {
                  if(element.awayScore == element.homeScore) {
                  this.teamGrade.push('D');
              } else if(element.homeScore > element.awayScore) {
                  if(element.homeTeamName == this.teamName) {
                       this.teamGrade.push('W');
                  }else {
                      this.teamGrade.push('L');
                  }
              }else {
                if(element.homeTeamName == this.teamName) {
                       this.teamGrade.push('L');
                  }else {
                      this.teamGrade.push('W');
                  }
              }
            }
          })
      }
  },
  created(){
      this.teamName = this.$route.query.teamName;
  },
  mounted(){
      this.getTeamInfo(this.teamName);
  }
}
</script>
<style scoped>
.app {
    width: 100vw;
    height: 100vh;
}
.team-detail {
    width: 60vw;
    background-color: white;
    margin-top: 20px;
}
.schedule {
    width: 60vw;
    background-color: white;
}
.team-title {
    margin-left: 30px;
}
.national-flag {
    width: 20px;
    height: 20px;
}
.team-name {
    font-size: 30px;
    font-weight: 500;
    color: black;
}
.team-icon-big {
    width: 80px;
    height: 80px;
    margin-left: 30px;
}
.team-nickname {
    color: grey;
    font-size: 16px;
}
.team-icon {
    width: 30px;
    height: 30px;
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
    width: 30px;
}
.awayTeam {
    width: 120px;
}
</style>