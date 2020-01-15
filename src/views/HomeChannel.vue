<template>
  <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
    <div class="main menu-container" ref="menuContainer">
      <channel-item
        v-for="(item, index) in listdata"
        :key="index"
        :itemData="item"
        @click.native="enterList(item)"
      ></channel-item>
      <van-overlay :show="loading === true" z-index="999" duration="0.5">
        <van-loading class="fix" color="#1989fa" />
      </van-overlay>
    </div>
  </v-touch>
</template>
<script>
import { getChannel, getTypeListbyTab, getTypeListbyid } from "@/api/home";
import ChannelItem from "../components/home/ChannelItem.vue";
export default {
  created() {
    let localData = localStorage.getItem("HomeChannel");
    // this.listdata = localData ? JSON.parse(localData) : {};
    if (localData === null) {
      getChannel().then(res => {
        if (res.status === 200 && res.data.data !== null) {
          window.console.log(res.data.data);
          this.listdata = res.data.data;
          // 清除类型1的4个
          // this.listdata = res.data.data.filter(e=>{
          //   return e.cate_type==0;
          // });
          localStorage.setItem("HomeChannel", JSON.stringify(this.listdata));
        }
      });
    } else {
      this.listdata = JSON.parse(localData);
    }
  },
  data() {
    return {
      listdata: {},
      loading: false
    };
  },

  methods: {
    enterList(item) {
      this.loading = true;
      if (item.cateid === undefined) {
        getTypeListbyTab(item.tab).then(res => {
          // window.console.log(res.data,'data')
          if (res !== null) {
            let data = res.data;
            this.loading = false;
            this.$router.push({
              path: "listSearch",
              query: { data, name: item.catename, type: "tab", key: item.tab }
            });
          }
        });
      } else {
        getTypeListbyid(item.cateid).then(res => {
          window.console.log(res.data, "data");
          if (res !== null) {
            let data = res.data;
            this.loading = false;
            this.$router.push({
              path: "listSearch",
              query: { data, name: item.catename, type: "id", key: item.cateid }
            });
          }
        });
      }
    },
    swiperleft: function() {
      window.console.log("right");
      this.$router.push({ path: "/more" });
    },
    swiperright: function() {
      window.console.log("left");
      this.$router.push({ path: "/recommend" });
    }
  },
  components: {
    ChannelItem
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
.main {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  channel-item {
    flex-shrink: 0;
    float: left;
  }
}
</style>
