<template>
  <div class="app">
      <baidu-map class="map"></baidu-map>
  </div>
</template>

<script>
export default {
  name: 'Map',
  components: {},
  props: {
    locationPlace: undefined
  },
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
.map {
  width: 100%;
  height: 300px;
}
</style>
