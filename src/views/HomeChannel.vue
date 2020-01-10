<template>
  <div class="main">
    <channel-item v-for="(item, index) in listdata" :key="index" :itemData="item"></channel-item>
  </div>
</template>
<script>
import { getChannel } from "@/api/home";
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
      listdata: {}
    };
  },
  components: {
    ChannelItem
  }
};
</script>

<style lang="less" scoped>
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
