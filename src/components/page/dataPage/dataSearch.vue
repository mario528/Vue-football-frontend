<template>
  <div class="container flex-column-x-center">
    <div class="search-place">
      <div class="company-icon-area flex-row-center">
         <img class="company-icon" src="../../../assets/compony_icon.png">
         <div class="company-title">懂球吗</div>
      </div>
      <el-autocomplete class="data-search"
                prefix-icon="el-icon-search"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                placeholder="请输入您要查询的球队,球员,联赛"
                v-model="userInput">
          <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="type">{{ item.type }}</span>
          </template>
      </el-autocomplete>
      <button class="search-btn">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataSearch',
  components: {},
  props: {},
  data () {
    return {
      userInput: undefined
    }
  },
  watch: {},
  computed: {},
  methods: {
    querySearchAsync (queryString, callback) {
      let list = []
      this.$http.post('/api/search', {
        searchQuery: this.userInput
      }).then((res) => {
        res.data.team.forEach(element => {
          element.value = element.name
          list.push(element)
        })
        callback(list)
      })
    },
    handleSelect (item) {
      console.log(item)
      if (item.type == 'team') {
        this.$router.push({
          path: '/data/team',
          query: {
            teamName: item.value
          }
        })
      }
    }
  },
  created () {},
  mounted () {
  }
}
</script>
<style scoped>
.container {
  height: calc(100vh - 80px);
  background-color: antiquewhite;
  background-image: url('../../../assets/background.jpg');
  background-size: 100% 100%;
}
.company-icon {
  width: 80px;
  height: 80px;
}
.company-title {
  font-size: 40px;
  color: white;
  font-weight: 600;
}
.company-icon-area {
  padding-top: 90px;
}
.data-search {
  width: 35vw;
  height: 40px;
  margin-top: 20px;
  border: none;
  outline: none;
}
.search-btn {
  height: 40px;
  width: 100px;
  background-color: rgb(82, 173, 75);
  color: white;
  border: none;
}
.name {
  float: left;
  margin-left: 10px;
}
.type {
  float: right;
  margin-right: 10px;
}
</style>
