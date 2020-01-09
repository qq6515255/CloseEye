<template>
  <div class="main" v-if="dayCoverDate !== null">
    <div class="filter-bg"></div>
    <div class="filter" :style="filterImg"></div>
    <div class="back"><van-icon name="cross" @click="clothDaycover" /></div>
    <div class="card">
      <div class="img-box">
        <img :src="dayCoverDate.image" alt="" />
        <div class="time">
          <p class="day">{{ dayCoverDate.time.day }}</p>
          <div>
            <h3>{{ dayCoverDate.time.month }}</h3>
            <h3>{{ dayCoverDate.time.week }}</h3>
          </div>
        </div>
      </div>
      <div class="down">
        <h3 class="title">{{ dayCoverDate.title }}</h3>
        <p>{{ dayCoverDate.content }}</p>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clothDaycover(){
          this.$store.commit("setdayCoverShow",false);
    }
  },
  computed: {
    filterImg() {
      if (this.dayCoverDate !== null) {
        return { backgroundImage: "url(" + this.dayCoverDate.image_blurred + ")" };
      } else {
        return null;
      }
    }
  },
  props: {
    dayCoverDate: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgb(0, 0, 0);
  z-index: 9999;
  .filter-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .filter {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: -2;
    position: absolute;
  }
  .back {
    width: 10vw;
    height: 10vh;
    margin: 0vh 5vw;
    line-height: 10vh;
    color: white;
    font-size: 25px;
    text-align: left;
  }
  .card {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 90vw;
    margin: 0vh 5vw;
    border-radius: 5px;
    overflow: hidden;
    .img-box {
      overflow: hidden;
      position: relative;
      width: 100%;
      img {
        width: 100%;
        display: block;
      }
      .time {
        padding: 0px 5%;
        width: 100%;
        position: absolute;
        height: 50px;
        bottom: 20px;
        left: 0px;
        color: white;
        overflow: hidden;
        div{
          float:left;
          line-height: 25px;
          margin-left: 10px;
          h3{
            font-weight: 600;
            text-align: left;
            font-size: 14px;
          }
        }
        .day{
          height:100%;
          float: left;
          font-size: 35px;
          font-weight: 500;
          line-height: 50px;
          padding:0px 10px;
          border-right: 1px solid white;
        }
      }
    }
    .down{
      background-color: rgb(255, 255, 255);
      bottom: 0px;
      padding: 10px;
      flex: 1;
      .title{
        margin-bottom: 10px;
        font-weight: 600;
      }
      p{
        font-size: 14px;
        color: #5e6363;
      }
    }
  }
}
</style>
