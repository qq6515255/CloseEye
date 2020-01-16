<template>
  <v-touch
    v-on:swipeleft="swiperleft"
    v-on:swiperight="swiperright"
    class="wrapper"
    :swipe-options="{ direction: 'horizontal' }"
  >
    <div class="main menu-container" ref="menuContainer">
      <div class="top">
        <van-icon name="arrow-left" @click="$router.back()" />
        {{ listName }}
      </div>

      <van-list
        v-if="loadList !== null"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :error.sync="error"
        error-text="加载失败,点击重试"
      >
        <home-list v-for="(item, index) in loadList" :key="index" :listData="item"></home-list>
      </van-list>
    </div>
  </v-touch>
</template>

<script>
import HomeList from "@/components/home/HomeList";
import { getTypeListbyTab, getTypeListbyid } from "@/api/home";
export default {
  created() {
    // if (this.$route.query.data !== null) {
    // this.type = this.$route.query.type;
    // window.console.log(this.$route.query.data);
    // this.loadList.push({ list: this.$route.query.data.data });
    // this.listNmae = this.$route.query.name;
    // this.type = this.$route.query.type;
    // this.key = this.$route.query.key;

    this.loadList.push({ list: this.getdata.data });
    // this.$nextTick(() => {
    //   window.scrollTo(0, 0);
    // });

    // }
  },
  methods: {
    onLoad() {
      // 获取方式
      if (this.type === "tab") {
        getTypeListbyTab(this.keywor, this.page).then(res => {
          if (res.data.data !== undefined) {
            this.loadList.push({ list: res.data.data });
            this.loading = false;
            this.page++;
          } else {
            this.loading = false;
            this.error = true;
          }
        });
      } else {
        getTypeListbyid(this.keywor, this.page).then(res => {
          if (res.data.data !== undefined) {
            this.loadList.push({ list: res.data.data });
            this.loading = false;
            this.page++;
          } else {
            this.loading = false;
            this.error = true;
          }
        });
      }
    },
    swiperleft: function() {
      window.console.log("right");
      this.$router.push({ path: "/channel" });
    },
    swiperright: function() {
      window.console.log("left");
      this.$router.push({ path: "/channel" });
    }
  },
  data() {
    return {
      // key: null,
      page: 1,
      // type: "",
      // listNmae: "",
      loadList: [],
      error: false,
      loading: false,
      finished: false
    };
  },
  props: {
    getdata: null,
    listName: null,
    type: null,
    keywor: null
  },
  watch: {
    keywor(newkey, oldkey) {
      if (newkey === oldkey) {
        return;
      } else {
        this.loadList = [];
        this.loadList.push({ list: this.getdata.data });
        this.page++;
      }
    }
  },
  components: {
    HomeList
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: white;
  text-align: center;
  background-color: black;
  font-size: 16px;
  overflow: hidden;
  font-weight: 600;
  padding: 0 5vw;
  i {
    font-size: 20px;
    line-height: 60px;
    color: white;
    vertical-align: middle;
    float: left;
  }
}
</style>
