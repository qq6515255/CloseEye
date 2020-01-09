<template>
  <div class="list-item" v-if="listInfo!== null">
    <div class="cover"></div>
    <img :src="listInfo.image" alt="error" />
    <div class="item-info">
      <span>{{this.listInfo.cates[0].catename}} / {{durationTime}}″</span>
      <h3 class="title">{{this.listInfo.title}}</h3>
    </div>
  </div>
</template>

<script>
export default {
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
      }else{
        return 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list-item {
  width: 100%;
  overflow: hidden;
  position: relative;
  img {
    display: block;
    width: 100%;
  }
  .cover{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
  }
  .item-info {
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: 100%;
    position: absolute;
    bottom: 0%;
    padding: 15px;
    text-align: left;
    z-index: 1;
    span{
      font-size: 14px;
      color: #fdfdfd;
      line-height: 25px;
      font-weight: 600;
    }
    h3{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      color: white;
      font-weight: 700;
      line-height: 25px;
    }
  }
}
</style>
