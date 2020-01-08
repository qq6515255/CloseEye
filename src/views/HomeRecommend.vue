<template>
  <div class="main">
    <van-swipe :autoplay="5000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getDaycover, getIndex } from "@/api/home";
export default {
  created() {

    getDaycover().then(res => {
      if (res.status === 200) {
        this.dayCover = res.data.data;
        window.console.log(res);
      }
    });

    getIndex().then(res => {
      if (res.status === 200) {
        this.dayCover = res;
        window.console.log(res);
      }
    });

  },
  data() {
    return {
      dayCover:{},
      banner: []
    };
  }
};
</script>

<style></style>
