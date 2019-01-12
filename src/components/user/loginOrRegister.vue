<template>
  <div class="container flex-row-center">
      <div class="popup-menu">
          <div class="login-place" v-if="state == 0">
              <div class="flex-row-space-between">
                    <span class="menu-title">登录</span>
              </div>
          </div>
          <div class="register-place" v-else>
               <div class="flex-row-space-between">
                    <span class="menu-title">注册</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'LoginOrRegister',
  components: {},
  props: {},
  data () {
    return {
      state: 0 // 0: 登录 1: 注册
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
.popup-menu {
    width: 40vw;
    height: 20vh;
    background-color: grey;
}
.login-place {
    position: relative;
}
.register-place {
    position: relative;
}
</style>
