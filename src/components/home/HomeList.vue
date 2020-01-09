<template>
  <div class="home-list" v-if="listData !== null">
    <div class="title" v-if="listData.selection_title">{{ listData.selection_title }}</div>
    <home-list-item
      v-for="(item, index) in listData.list"
      :key="index"
      :listInfo="item"
    ></home-list-item>
  </div>
</template>

<script>
// <slot name="title"></slot>
import HomeListItem from "../home/HomeListItem.vue";
export default {
  props: {
    listData: null
  },
  components: {
    HomeListItem
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 7vh;
  line-height: 7vh;
  color: #fdfefe;
  font-size: 12px;
  text-align: center;
}
</style>
