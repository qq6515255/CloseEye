<template>
  <div class="nav-bar" :style="getNavBgc">
    <div class="left"><slot name='left'></slot></div>
    <div class="center"><slot name='center'></slot></div>
    <div class="right"><slot name='right'></slot></div>
  </div>
</template>

<script>
export default {
  computed: {
    getNavBgc(){
      return {'background-color':this.navBgc}
    }
  },
  props:{
    navBgc:{
      type:String,
      default:'white',
    }
  }
};
</script>


<style lang="less" scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1
  }
}

</style>
