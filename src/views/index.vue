<template>
  <div class="main">
    <div class="cover"></div>
    <transition-group tag="div" class="img-list">
      <img
        :src="item"
        alt="error"
        v-for="(item, index) in bgImg"
        :key="index"
        :style="{ opacity: index === imgIndex ? '1' : '0' }"
      />
    </transition-group>
    <div class="btn-box">
      <div class="logo">
        <img :src="logo" alt="error">
      </div>
      <div class="title">Open your eyes open your mind </div>
      <div class="enter">
        <router-link to="/home">Start Now</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setInterval(this.next, 5000);
  },
  data() {
    return {
      imgIndex: 0,
      bgImg: [
        require("../img/home_bk_1.9583a28a.jpg"),
        require("../img/home_bk_2.6b1727b7.jpg"),
        require("../img/home_bk_3.7819585d.jpg"),
        require("../img/home_bk_4.c268348d.jpg"),
        require("../img/home_bk_5.c48e7769.jpg"),
        require("../img/home_bk_6.54b06aad.jpg"),
        require("../img/home_bk_7.8b2d29b4.jpg")
      ],
      logo:require("../img/1578402581.png"),
    };
  },
  methods: {
    next() {
      if (this.imgIndex+1 > this.bgImg.length - 1) {
        this.imgIndex = 0;
      } else {
        this.imgIndex++;
      }
    }
  }
};
</script>

<style lang="less" scoped>

.img-list img {
  transition: all 1.5s ease;
}
.main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .cover {
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 2;
  }
  .img-list {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
    img {
      &.hidden {
        display: none;
      }
      &:nth-child(odd) {
        animation: g 8s ease infinite alternate;
      }
      animation: f 8s ease infinite alternate;
      position: absolute;
      top: 0;
      left: 0;
      width: 120% !important;
      max-width: 120%;
      height:120%;
    }
  }
}
.btn-box{
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  .enter{
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: inline-block;
    margin: 0px auto;
    border: 1px solid  rgba(255 , 255, 255, 0.3);
    a{
      width: 160px;
      height:49px;
      display: block;
      line-height: 49px;
      background-origin: content-box;
      margin: 5px;
      background-color: rgba(255, 255, 255, 0.2);
      color: rgba(255 , 255, 255, 0.8);
      font-size: 18px;
      font-weight: 700;
    }
  }
  .logo{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .title{
    font-family: FZCYJ;
    position: absolute;
    top: 35%;
    width: 100%;
    text-align: center;
    font-size: 55px;
    color: rgba(255 , 255, 255, 0.8);
    
  }
}
@keyframes g {
  0% {
    transform: translateZ(0);
  }
  100% {
    transform: translate3d(-5%, -2%, 0);
  }
}
@keyframes f {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scale3d(1.3, 1.3, 1.3);
  }
}
</style>
