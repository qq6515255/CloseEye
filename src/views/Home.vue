<template>
  <div class="home">
    <nav-bar :navBgc="'black'">
      <van-icon slot="left" name="notes-o" class="notes-o" @click="openCover" aria-hidden="true" />

      <ul class="nav-iteam" slot="center">
        <li>
          <router-link to="/recommend">发现</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/channel' }">频道</router-link>
        </li>
        <li>
          <router-link to="/more">日报</router-link>
        </li>
      </ul>
      <router-link to="/search" slot="right">
        <van-icon class="search" name="search" />
      </router-link>
    </nav-bar>

    <keep-alive>
      <transition
         mode="out-in" 
        :enter-active-class="'animated '+ transitionInName"
        :leave-active-class="'animated '+ transitionOutName"
      >
        <router-view></router-view>
      </transition>
    </keep-alive>

    <transition name="fade">
      <day-cover v-show="getdayCoverShow" :dayCoverDate="dayCoverInfo"></day-cover>
    </transition>
  </div>
</template>

<script>
import NavBar from "../components/navbar/Navbar";
import DayCover from "../components/home/DayCover.vue";
import { mapGetters } from "vuex";
import { getDaycover } from "@/api/home";

export default {
  name: "home",
  components: {
    NavBar,
    DayCover
  },

  methods: {
    // 开启每日封面的
    openCover() {
      this.$store.commit("setdayCoverShow", true);
    }
  },
  data() {
    return {
      dayCoverInfo: null,
      indexInfo: null,
      transitionInName: null,
      transitionOutName: null
    };
  },
  computed: {
    ...mapGetters(["getdayCoverShow"])
  },
  created() {
    getDaycover().then(res => {
      if (res.status === 200) {
        this.dayCoverInfo = res.data.data;
        window.console.log(res);
      }
    });

    // getIndex().then(res => {
    //   if (res.status === 200) {
    //     this.indexInfo = res.data.data;
    //     window.console.log(res);
    //   }
    // });
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      // window.console.log("to.meta.index==>", to.meta.index);
      // window.console.log("from.meta.index==>", from.meta.index);
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionInName = "fadeInRight";
        this.transitionOutName = "fadeOutLeft";
      } else {
        this.transitionInName = "fadeInLeft";
        this.transitionOutName = "fadeOutRight";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  background-color: #1a1a1a;
  min-height: 100vh;
}
.notes-o {
  color: white;
  font-size: 20px;
  vertical-align: middle;
}
.search {
  color: white;
  font-size: 18px;
  line-height: 44px;
}
.nav-iteam {
  display: flex;
  li {
    flex: 1;
    a {
      color: #716e6e;
      font-size: 14px;
      font-weight: 600;
      display: inline-block;
      line-height: 38px;
      padding: 0px 5px;

      &:active {
        color: #c9c9c9;
      }
      &.router-link-exact-active {
        font-weight: bold;
        color: #c9c9c9;
        border-bottom: 3px solid #c9c9c9;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
