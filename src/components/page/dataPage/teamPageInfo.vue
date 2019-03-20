<template>
  <div class="app">
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
  </div>
</template>

<script>
export default {
  name: 'teamPageInfo',
  components: {},
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped>
</style>
