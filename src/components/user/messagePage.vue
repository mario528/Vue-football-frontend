<template>
  <div class="app">
    <div></div>
    <button v-on:click="send">发送消息</button>
  </div>
</template>

<script>
export default {
  name: "InputComponentName",
  components: {},
  props: {},
  data() {
    return {
      inputText: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    send() {
      this.$socket.emit("sendMsg", {
        to: "majiaao",
        msg: "生日快乐！加奥"
      });
    }
  },
  created() {},
  mounted() {
    this.userName = this.$route.query.userName;
    this.jordansw = this.$route.query.jordansw;
  }
};
</script>
<style scoped>
</style>