<template>
  <div class="app">
      <div class="user-toast" v-bind:class="status=='success'?'user-toast success':'user-toast fail'">
          <i :class="status=='success'?'el-icon-success':'el-icon-error'"></i>
          <span>{{msg}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  components: {},
  props: ['msg', 'status'],
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped>
.user-toast {
    position: absolute;
    top: -80px;
    left: 35vw;
    width: 30vw;
    height: 40px;
    background-color: white;
    text-align: center;
    line-height: 40px;
    animation: slideInDown 5s linear;
    font-size: 20px;
    font-weight: 500;
    border-radius: 10px;
}
.success {
    background-color: rgb(240, 249, 236);
    color: rgb(142, 212, 122);
}
.fail {
    background-color: rgb(254, 240, 240);
    color: rgb(246, 108, 109);
}
@keyframes slideInDown {
    0% {
        transform: translate3d(0, -40px, 0);
    }
    10% {
        transform: translate3d(0, 120px, 0);
    }
    90% {
        transform: translate3d(0, 120px, 0);
    }
    100% {
        transform: translate3d(0, -40px, 0);
    }
}
</style>
