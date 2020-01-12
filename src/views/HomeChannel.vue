<template>
  <div class="main">
    <channel-item
      v-for="(item, index) in listdata"
      :key="index"
      :itemData="item"
      @click.native="enterList(item)"
    ></channel-item>
    <van-overlay :show="loading===true" z-index=999 duration=0.5 >
      <van-loading class="fix" color="#1989fa" />
    </van-overlay>
  </div>
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
    }
  },
  components: {
    ChannelItem
  }
};
</script>

<style lang="less" scoped>
.fix{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
