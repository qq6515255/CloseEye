<template>
  <div class="main" v-if="indexDate !== null">
    <div class="content">
      <van-swipe :autoplay="4000" @change="onChange" indicator-color="white">
        <van-swipe-item v-for="(item, index) in indexDate.banner.list" :key="index">
          <img :src="item.image" />
        </van-swipe-item>
        
        <ul class="custom-indicator" slot="indicator">
          <li
            v-for="(item, index) in indexDate.banner.list"
            :key="index"
            :class="{ active: current === index }"
          ></li>
        </ul>
      </van-swipe>
    </div>
    <home-list :listData="indexDate.today"></home-list>
    <!--  专题推荐 -->
    <div class="album" v-if="indexDate.album !== null">
      <div class="title" v-if="indexDate.album.selection_title !== null">
        {{ indexDate.album.selection_title }}
      </div>
      <van-swipe :autoplay="4000" @change="onAlbumChange" indicator-color="white">
        <van-swipe-item v-for="(item, index) in indexDate.album.list" :key="index">
          <home-list-item :listInfo="item"></home-list-item>
        </van-swipe-item>

        <ul class="custom-indicator" slot="indicator">
          <li
            v-for="index in indexDate.album.list.length"
            :key="index"
            :class="{ active: albumCurrent === index - 1 }"
          ></li>
        </ul>
      </van-swipe>
    </div>

    <home-list :listData="indexDate.hot" :type="'hot'"></home-list>

    <!-- <home-list :listData="indexDate.album"></home-list> -->
    <van-list
      v-if="loadList !== null && indexDate.today"
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
</template>

<script>
import HomeListItem from "@/components/home/HomeListItem";
import { getIndex } from "@/api/home";
import { AGENT } from "@/api/base";
import HomeList from "@/components/home/HomeList";
export default {
  created() {
    getIndex().then(res => {
      if (res.status === 200) {
        this.indexDate = res.data.data;
        this.loadList.push(res.data.data.posts);
        window.console.log(res);
      }
    });
  },
  computed: {
    nextUrl() {
      if (this.loadList !== null) {
        return AGENT + this.loadList[this.loadList.length - 1].next_page_url_full;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      indexDate: null,
      current: 0,
      loadList: [],
      loading: false,
      finished: false,
      error: false,
      albumCurrent: 0
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onAlbumChange(index) {
      this.albumCurrent = index;
    },
    // 加载
    onLoad() {
      window.console.log("load");
      this.axios(this.nextUrl).then(res => {
        if (res.data.data !== undefined) {
          window.console.log("加载数据", res.data.data);
          this.loadList.push(res.data.data);
          this.loading = false;
        } else {
          window.console.log("flase===>", this.nextUrl);
          this.loading = false;
          this.error = true;
        }
      });
    }
  },
  components: {
    HomeList,
    HomeListItem
  }
};
</script>

<style lang="less" scoped>
.content {
  overflow: hidden;
  
}
.main {
  position: relative;
}
.album {
  .title {
    width: 100%;
    height: 7vh;
    line-height: 7vh;
    color: #fdfefe;
    font-size: 12px;
    text-align: center;
  }
}
.custom-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  height: 2px;
  padding: 0px 5px;
  li {
    float: left;
    height: 2px;
    width: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    margin: 0px 3px;
    &.active {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
