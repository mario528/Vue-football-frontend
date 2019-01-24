<template>
  <div class="app flex-column-center">
      <div class="notfound flex-column-center">
          <div class="notfound-title">
              404
          </div>
          <div class="notfound-content">
              抱歉 ，您访问的页面不存在……
          </div>
          <div class="notfound-btn" v-on:click="actionBackHome">返回首页</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    actionBackHome () {
      this.$router.push('/home')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped>
* {
    margin: 0px;
    padding: 0px;
}
.notfound {
    width: 100vw;
    height: 90vw;
    background-image: url('../../assets/404.png');
    background-size: 100% 100%;
}
.notfound-title {
    font-size: 80px;
    color: white;
}
.notfound-content {
    font-size: 20px;
    color: white;
}
.notfound-btn {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    margin-top: 80px;
    background-color: rgba(255, 255, 255, 0.4);
}
</style>
