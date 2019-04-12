<!--
 * @Author: majiaao
 * @Date: 2019-01-19 17:01:56
 * @LastEditors: majiaao
 * @LastEditTime: 2019-03-24 02:50:59
 * @Description: file content
 -->
<template>
  <div class="app">
    <div class="homepage-banner flex-row">
      <div class="scrollview">
        <swiper :options="swiperOption" class="homepage-swiper">
          <swiper-slide v-for="(item,index) in bannerList" v-bind:key="index">
            <img class="swiper-item-img" v-bind:src="item.url">
            <div class="swiper-item-title">{{item.title}}</div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <div class="banner-schedule flex-column-center">
        <div
          class="schedule-item-row flex-row-x-center"
          v-for="(item,index) in hotMatchList"
          v-bind:key="index"
        >
          <div class="schedule-item flex-column-x-center">
            <img :src="item.awayTeamIcon" :alt="item.awayTeamName" class="team-icon">
            <div class="team-name">{{item.awayTeamName}}</div>
          </div>
          <div class="schedule-item-middle flex-column-center">
            <div class="match-property">{{item.matchState}}</div>
            <div class="match-score flex-row-y-center" v-if="item.homeTeamScore">
              <div class="team-score">{{item.homeTeamScore}}</div>
              <div class="team-score-middle">:</div>
              <div class="team-score">{{item.awayTeamScore}}</div>
            </div>
             <div class="match-score flex-row-y-center" v-else>
              <div class="team-score-middle">-</div>
            </div>
          </div>
          <div class="schedule-item flex-column-x-center">
            <img :src="item.homeTeamIcon" :alt="item.name" class="team-icon">
            <div class="team-name">{{item.homeTeamName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="homepage-content flex-row">
      <div class="homepage-news"></div>
      <div class="homepage-rank" v-on:click="actionTochangeType">
        <div class="rank-swiper">
          <li :class="[leagueType=='china'?'rank-swiper-item-active':'rank-swiper-item']" id="china">中超</li>
          <li :class="[leagueType=='english'?'rank-swiper-item-active':'rank-swiper-item']" id="english">英超</li>
          <li :class="[leagueType=='spain'?'rank-swiper-item-active':'rank-swiper-item']" id="spain">西甲</li>
          <li :class="[leagueType=='dermany'?'rank-swiper-item-active':'rank-swiper-item']" id="dermany">德甲</li>
          <li :class="[leagueType=='italy'?'rank-swiper-item-active':'rank-swiper-item']" id="italy">意甲</li>
          <li :class="[leagueType=='french'?'rank-swiper-item-active':'rank-swiper-item']" id="french">法甲</li>
        </div>
        <div class="rank-header flex-row-y-center">
          <div v-bind:class="[index == 0 ? 'header-item-title' : 'header-item']" v-for="(item,index) in headerList" v-bind:key="index">
            {{item}}
          </div>
        </div>
        <div class="rank-content flex-column" v-for="(item,index) in rankContent" v-bind:key="index">
            <div class="rank-content-row flex-row-y-center">
              <div class="rank-team" id="team-title" v-on:click="handleTeamPage(item.team_name)">{{item.team_name}}</div>
              <div class="rank-team">{{item.matches_total}}</div>
              <div class="rank-team">{{item.matches_won}}</div>
              <div class="rank-team">{{item.matches_draw}}</div>
              <div class="rank-team">{{item.matches_lost}}</div>
              <div class="rank-team">{{item.goals_pro}}/{{item.goals_against}}</div>
              <div class="rank-team">{{item.points}}</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import rankType from '../../utils/rankType'
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {
      swiperOption: {
        speed: 1000,
        loop: true,
        autoplay: true,
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        stopOnLastSlide: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      bannerList: [],
      rankContent: [],
      headerList: [],
      leagueType: 'china',
      hotMatchList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    getRank (type, callback) {
      let item = []
      if (typeof type !== 'string') {
        throw new Error('请输入正确的联赛')
      }
      this.$http.get('/v1/team_ranking/0?', {
        params: {
          season_id: this.getLeagueNum(type),
          version: 0,
          refer: 'data_tab',
          type: 'total_ranking',
          from: 'msite_com'
        }
      }).then((result) => {
        console.log(result.data.content.rounds[0].content.data)
        result.data.content.rounds[0].content.data.forEach(element => {
          item.push(element.team_name)
          console.log(item)
        })
        callback(result)
      })
    },
    getLeagueNum (leagueStr) {
      return rankType[leagueStr]
    },
    actionTochangeType (event) {
      this.leagueType = event.target.id
      this.getRank(this.leagueType, (res) => {
        this.headerList = res.data.content.rounds[0].content.header
        this.rankContent = res.data.content.rounds[0].content.data
      })
    },
    handleTeamPage (teamName) {
      this.$router.push({
        path: '/data/team',
        query: {
          teamName: teamName
        }
      })
    }
  },
  created () {
    this.getRank('china', (res) => {
      this.headerList = res.data.content.rounds[0].content.header
      this.rankContent = res.data.content.rounds[0].content.data
    })
    this.$http.get('/api/home').then((result) => {
      this.bannerList = result.data.data.banner
      this.hotMatchList = result.data.data.hotMathch
    })
  },
  mounted () {}
}
</script>
<style>
.homepage-banner {
  background-color: white;
  width: 75vw;
  height: 20vw;
  margin-top: 40px;
  margin-left: calc((100vw - 75vw)/2);
}
.homepage-content {
  width: 75vw;
  height: 50vw;
  margin-left: calc((100vw - 75vw)/2);
  margin-top: 20px;
}
.scrollview {
  position: relative;
}
.homepage-swiper {
  width: 50vw;
}
.swiper-item-img {
  width: 50vw;
  height: 20vw;
}
.swiper-item-title {
  font-size: 20px;
  font-weight: 500;
  color: #eeeeee;
  position: absolute;
  bottom: 20px;
  left: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 5px 10px 5px;
}
.team-icon {
  width: 40px;
  height: 40px;
}
.banner-schedule {
  width: 100%;
  background-color: rgb(50, 50, 50);
}
.schedule-item-row {
  width: 100%;
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid rgb(37, 37, 37);
}
.schedule-item-row:hover {
  background-color: rgb(37, 37, 37);
}
.schedule-item {
  width: 40%;
}
.team-name {
  color: white;
  font-weight: 400;
  margin-top: 10px;
}
.team-score {
  color: white;
  font-weight: 500;
  margin-top: 10px;
  font-size: 20px;
}
.team-score-middle {
  color: white;
  font-weight: 500;
  margin-top: 10px;
  font-size: 20px;
  padding: 0px 10px 0px 10px;
}
.match-property {
  font-size: 14px;
  color: white;
  font-weight: 400;
}
.match-score {
  font-size: 20px;
  color: white;
  font-weight: 400;
}
.rank-header {
  width: 100%;
}
.header-item {
  width: 3vw;
  text-align: center;
}
.rank-content {
  text-align: center;
  width: 5vw;
}
.rank-content-row {
  width: 24vw;
  background-color: rgb(50, 50, 50);
}
#team-title {
  width: 6vw;
}
.header-item-title {
  width: 6vw;
  text-align: center;
  background-color: rgb(82, 173, 75);
  padding: 5px 0px 5px 0px;
  color: white;
}
.rank-team {
  text-align: center;
  width: 3vw;
  padding: 5px 0px 5px 0px;
  font-size: 12px;
  color: white;
  border-bottom: 1px solid rgb(37, 37, 37);
  cursor: pointer;
}
.rank-swiper {
  width: 24vw;
  height: 50px;
  background-color: rgb(50, 50, 50);
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rank-swiper-item {
  width: 5vw;
  font-size: 16px;
  display: inline-block;
  text-align: center;
  color: white;
  cursor: pointer;
}
.rank-swiper-item-active {
  width: 5vw;
  font-size: 16px;
  display: inline-block;
  text-align: center;
  color: white;
  cursor: pointer;
  border-bottom: 2px solid rgb(82, 173, 75);
}
.header-item {
  background-color: rgb(82, 173, 75);
  padding: 5px 0px 5px 0px;
  color: white;
}
.rank-swiper-item {
  display: inline-block;
}
.homepage-news {
  width: 50vw;
  height: 400px;
  background-color: sandybrown;
}
</style>
