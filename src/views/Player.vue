<template>
  <div class="play-main" v-if="getplayerData.pid !== undefined">
    <van-sticky>
      <div class="top">
        <van-icon name="arrow-left" @click="$router.back()" />
      </div>
      <video class="video" width="100%" controls autoplay :src="this.urlList[urlIndex]">
        <!-- <source
          v-for="(item, index) in getplayerData.content_video[0].progressive"
          :key="index"
          :src="item.url"
          type="video/mp4"
        /> -->
        您的浏览器不支持Video标签。
      </video>
      <!-- <img  class="video-img" :src="getplayerData.image" alt="" v-if="!reset"> -->
    </van-sticky>

    <div class="info">
      <h3 class="title">{{ getplayerData.title }}</h3>
      <p class="titleInfo">
        <span v-for="(item, index) in getplayerData.cate" :key="index">{{ item }} </span> /
        {{ durationTime }}″
      </p>
      <p class="content">{{ getplayerData.intro }}</p>
      <div class="more"><span>阅读全文 →</span></div>
    </div>
    <!-- 推荐区 -->
    <template
      v-if="getplayerData.relate_video !== undefined && getplayerData.relate_video.length > 0"
    >
      <relate-list
        v-for="(item, index) in getplayerData.relate_video"
        :key="index"
        :listData="item"
      ></relate-list>
    </template>
    <!-- 评论区 -->
    <template>
      <div class="comment">
        <div class="comment-title">{{ getplayerData.comment.total }} 条评论</div>
        <div v-if="getplayerData.comment.total > 0">
          <comment-item
            v-for="(item, index) in getplayerData.comment.list"
            :key="index"
            :commentData="item"
          ></comment-item>
        </div>
      </div>
    </template>
    <h3 class="end">- End -</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Vue from "vue";
import RelateList from "@/components/home/RelateList.vue";
import CommentItem from "@/components/home/CommentItem.vue";
export default {
   created() {
     
   },
  data() {
    return {
      urlIndex:0,
      // playerData:{},
    };
  },
  watch: {
    // getplayerData(newItem, oldItem) {
    //   if (newItem !== oldItem) {
    //     this.$nextTick(() => {
    //       this.showVideo = true;
    //     });
    //   }
    // }
    
  },
  components: {
    RelateList,
    CommentItem
  },
  computed: {
    durationTime() {
      if (this.getplayerData !== null) {
        return [
          parseInt((this.getplayerData.duration / 60) % 60),
          parseInt(this.getplayerData.duration % 60)
        ]
          .join("′")
          .replace(/\b(\d)\b/g, "0$1");
      } else {
        return 0;
      }
    },
    urlList() {
      if (this.getplayerData !== null) {
        let list=[]
        this.getplayerData.content_video[0].progressive.forEach(e => {
          list.push(e.url);
        });
        return list
      } else {
        return null;
      }
    },
    // playerData(){
    //  return  this.$route.query.setplayerData;
    // },
    ...mapGetters(["getplayerData"])
  },
  beforeRouteEnter (to, from, next) {   
    next(vm =>{
      if (vm.$store.getplayerData===undefined) {
        vm.$store.commit("setplayerData");
        window.scrollTo(0, 0);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.end {
  text-align: center;
  font-size: 12px;
  color: #747474;
  padding: 2vh;
}
.video {
  // position: sticky;
  // top: 0px;
  // z-index: 9999;
}
.video-img {
  width: 100%;
  height: 224px;
  display: block;
}
.play-main {
  overflow: hidden;
  background-color: #f5f5f5;
  .top{
    width: 100%;
    height: 49px;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: left;
    position: absolute;
    top: 0;
    left: 0;
    i{
      line-height: 49px;
      color: white;
      padding: 0 2vw;
      z-index: 99999;
    }
  }
  .comment-title {
    padding: 10px 0;
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    border-top: 1px solid #74747424;
    padding: 2vh;
  }
  .comment {
    .comment-main {
      padding: 2vh;
    }
  }
  .info {
    padding: 5vh 2vh;
    overflow: hidden;
    text-align: center;
    border-bottom: 1px solid #74747424;
    .title {
      font-size: 16px;
      font-weight: 800;
      color: black;
    }
    .titleInfo {
      margin: 2vh 0px;
      color: #747474;
      font-size: 12px;
    }
    .content {
      text-align: left;
      font-size: 15px;
      color: black;
    }
    .more {
      color: #3385ff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3vh;
      padding-bottom: 0px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
