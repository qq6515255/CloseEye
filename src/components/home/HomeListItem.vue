<template>
  <div class="list-item" @click="enterPlayer(listInfo.postid)" v-if="listInfo !== null">
    <div class="cover"></div>
    <img :src="listInfo.image" alt="error" />
    <div class="item-info">
      <span>{{ this.listInfo.cates[0].catename }} / {{ durationTime }}″</span>
      <h3 class="title">{{ this.listInfo.title }}</h3>
    </div>
    <van-overlay :show="loading === true" z-index="999" duration="0.5">
      <van-loading class="fix" color="#1989fa" />
    </van-overlay>
  </div>
</template>

<script>
import { getView } from "@/api/home.js";
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    listInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    durationTime() {
      if (this.listInfo !== null) {
        return [parseInt((this.listInfo.duration / 60) % 60), parseInt(this.listInfo.duration % 60)]
          .join("′")
          .replace(/\b(\d)\b/g, "0$1");
      } else {
        return 0;
      }
    }
  },
  methods: {
    enterPlayer(e) {
      this.loading = true;
      window.console.log(e);
      getView(e).then(res => {
        this.loading = false;
        window.console.log(res);
        if (res.status === 200 && res.data.data !== null) {
          this.$store.commit("setplayerData", res.data.data);
          this.$router.push("player");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.fix {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.list-item {
  width: 100%;
  overflow: hidden;
  position: relative;
  img {
    display: block;
    width: 100%;
  }
  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
  }
  .item-info {
    font-size:18px;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.4) 40%,
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0) 100%
    );
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    width: 100%;
    position: absolute;
    bottom: 0%;
    padding:.5em;
    text-align: left;
    z-index: 1;
    span {
      font-size: 0.4rem;
      color: #fdfdfd;
      line-height: .2rem;
      font-weight: 500;
    }
    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: .9rem;
      color: white;
      font-weight: 500;
      line-height: 1.4rem;
      font-weight: 700;
    }
  }
}
</style>
