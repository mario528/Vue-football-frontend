<template>
  <div class="app flex-row-x-center">
    <div class="homepage-banner flex-row">
      <div class="scrollview">
        <swiper :options="swiperOption" class="homepage-swiper">
          <swiper-slide v-for="(item,index) in swiperList" v-bind:key="index">
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
          v-for="(item,index) in matchList"
          v-bind:key="index"
        >
          <div class="schedule-item flex-column-x-center">
            <img :src="item.itemHome.icon" :alt="item.name" class="team-icon">
            <div class="team-name">{{item.itemHome.name}}</div>
          </div>
          <div class="schedule-item-middle flex-column-center">
            <div class="match-property">{{item.property}}</div>
            <div class="match-score flex-row-y-center">
              <div class="team-score">{{item.itemHome.score}}</div>
              <div class="team-score-middle">:</div>
              <div class="team-score">{{item.itemAway.score}}</div>
              </div>
          </div>
          <div class="schedule-item flex-column-x-center">
            <img :src="item.itemAway.icon" :alt="item.name" class="team-icon">
            <div class="team-name">{{item.itemAway.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper0 from "../../assets/swiper0.png";
import swiper1 from "../../assets/swiper1.jpg";
import swiper2 from "../../assets/swiper2.jpg";
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      swiperOption: {
        autoplay: 500,
        speed: 1000,
        loop: true,
        autoplay: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperList: [
        {
          title: "多家媒体：C罗接受西班牙检方处罚，上缴1880万欧罚款",
          url: swiper0
        },
        {
          title: "虽然我的弟弟是大佬，但哥只想上场踢球",
          url: swiper1
        },
        {
          title: "“王子”降临诺坎普，你还记得他和他的暴力美学吗？",
          url: swiper2
        }
      ],
      matchList: [
        {
          property: "友谊赛",
          isBegin: false,
          itemHome: {
            icon: "http://img.dongqiudi.com/data/pic/429.png",
            name: "北京国安",
            score: 4
          },
          itemAway: {
            icon: "http://img.dongqiudi.com/data/pic/6557.png",
            name: "贵州人和",
            score: 1
          }
        },
        {
          property: "友谊赛",
          isBegin: false,
          itemHome: {
            icon: "http://img.dongqiudi.com/data/pic/429.png",
            name: "北京国安",
            score: 5
          },
          itemAway: {
            icon: "http://img.dongqiudi.com/data/pic/6557.png",
            name: "贵州人和",
            score: 2
          }
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
.homepage-banner {
  background-color: white;
  width: 75vw;
  height: 20vw;
  margin-top: 40px;
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
</style>
