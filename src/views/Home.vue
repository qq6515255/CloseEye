<template>
  <div class="home">
    <nav-bar :navBgc="'black'">
      <span slot="left" class="fa fa-calendar-minus-o" @click="openCover" aria-hidden="true"></span>
      <ul class="nav-iteam" slot="center">
        <li>
          <router-link to="/recommend">发现</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/hot' }">频道</router-link>
        </li>
        <li>
          <router-link to="/search">日报</router-link>
        </li>
      </ul>
    </nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  <DayCover v-show="mapGetters" :dayCoverDate='DayCover' ></DayCover>
  </div>
</template>

<script>
import NavBar from "../components/navbar/Navbar";
import DayCover from "../components/home/Daycover";
import { mapGetters } from 'vuex'
export default {
  name: "home",
  components: {
    NavBar,
    DayCover,
  },
  methods: {
    // 开启每日封面的
    openCover(){
      this.$store.commit("setdayCoverShow", {
        value:true
      });
    }
  },
  computed: {
    ...mapGetters([
      'getdayCoverShow',
    ])
  }
};
</script>
<style lang="less" scoped>
.fa-calendar-minus-o {
  color: white;
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
        color: #C9C9C9
      }
      &.router-link-exact-active {
        font-weight: bold;
        color: #C9C9C9;
        border-bottom: 3px solid #C9C9C9;
      }
    }
  }
}
</style>
