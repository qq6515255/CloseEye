<template>
<v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper">
  <div class="main menu-container" ref="menuContainer">等待开发啊同学</div>
  </v-touch>
</template>

<script>
export default {
methods: {
      swiperleft: function() {
      // this.$router.push({ path: "/queuehistory" });
      window.console.log('right');
      
      
    },
    swiperright: function() {
      this.$router.push({ path: "/channel" });
      window.console.log('left');
    }
},
}
</script>

<style lang='less' scoped>
.main{
  color: white;
  min-height: 100vh;
}
</style>