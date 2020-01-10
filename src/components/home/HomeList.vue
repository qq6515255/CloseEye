<template>
  <div class="home-list" v-if="listData !== null">
    <div class="title" v-if="listData.selection_title">{{ listData.selection_title }}</div>
    <home-list-item
      v-for="(item, index) in listData.list"
      :key="index"
      :listInfo="item"
      :class="{ mini: ismini && index > 0 }"
    ></home-list-item>
  </div>
</template>

<script>
// <slot name="title"></slot>
import HomeListItem from "../home/HomeListItem.vue";
export default {
  props: {
    listData: null,
    type: null
  },
  components: {
    HomeListItem
  },
  computed: {
    ismini() {
      if (this.type === "hot") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-list {
  overflow: hidden;
}
.mini {
  height: 130px;
  float: left;
  width: 50vw !important;
  .title {
    font-size: 12px ;
  }
}
.title {
  width: 100%;
  height: 7vh;
  line-height: 7vh;
  color: #fdfefe;
  font-size: 12px;
  text-align: center;
}
</style>
