<template>
  <div class="comment-main" v-if="commentData!==null">
    <div class="left-box"><img :src="commentData.userinfo.avatar" alt=""></div>
    <div class="right-box">
      <h2 class="name">{{commentData.userinfo.username}}</h2>
      <h3 class="time">{{commentData.addtime}}</h3>
      <p class="content">{{commentData.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
props:{
  commentData:null
}
}
</script>

<style lang='less' scoped>

  .comment-main{
    overflow: hidden;
    padding: 2vh 0px;
    border-bottom: 1px solid #74747424;
    .left-box{
      float: left;
      width: 8vw;
      margin-right: 2vw;
      img{
        
        border-radius: 50%;
        overflow: hidden;
        min-width: 100%;
        display: block;
      }
    }
    .right-box{
      position: relative;
      overflow: hidden;
      text-align: left;
      .name{
        font-size: 12px;
        color:#747474
      }
      .time{
        font-size: 10px;
        line-height: 20px;
        margin: 5px 0px;
        color:#74747494;
      }
      .content{
        padding: 5px 0;
        font-size: 16px;
        color: black;
      }
    }
  }
</style>