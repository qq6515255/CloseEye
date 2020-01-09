<template>
  <div class="main" v-if="indexDate !== null">
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
    <ul>
      <li><home-list :listData="indexDate.today"></home-list></li>
      <li><home-list :listData="indexDate.album"></home-list></li>
      <li><home-list :listData="indexDate.hot"></home-list></li>
      <li><home-list :listData="indexDate.posts"></home-list></li>
    </ul>
  </div>
</template>

<script>
import { getIndex } from "@/api/home";
import HomeList from "@/components/home/HomeList";
export default {
  created() {
    getIndex().then(res => {
      if (res.status === 200) {
        this.indexDate = res.data.data;
        window.console.log(res);
      }
    });
  },
  computed: {},
  data() {
    return {
      indexDate: null,
      current: 0
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    }
  },
  components: {
    HomeList
  }
};
</script>

<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
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
