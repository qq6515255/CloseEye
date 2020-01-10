import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

// const Home = () => import("../views/Home.vue");
// const HomeChannel = () => import("../views/HomeChannel.vue");
import HomeRecommend from "../views/HomeRecommend.vue";
import Home from "../views/Home.vue";
import HomeChannel from "../views/HomeChannel.vue";
import More from "../views/More";
import HomeSearch from "../views/HomeSearch.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    redirect: "/recommend",
    children: [
      {
        path: "/recommend",
        component: HomeRecommend,
        meta:{index:1},
      },
      {
        path: "/channel",
        component: HomeChannel,
        meta:{index:2},
      },
      {
        path: "/more",
        component: More,
        meta:{index:3},
      },
    ]
  },
  {
    path: "/search",
    name: "search",
    component: HomeSearch
  },

];

const router = new VueRouter({
  routes
});

export default router;
