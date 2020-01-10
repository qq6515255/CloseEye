<template>
  <div class="main" v-if="itemData!==null">
    <div class="cover"></div>
    <div class="bg" :style="filterImg"></div>
    <p class="info"># {{this.itemData.catename}} #</p>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    filterImg() {
      if (this.dayCoverDate !== null) {
        return { backgroundImage: "url(" + this.itemData.icon + ")" };
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 50vw;
  height: 50vw;
  position: relative;
  .cover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;

  }
  p {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    text-align: center;
    transform: translateY(-50%);
    z-index: 2;
  }
}
</style>
