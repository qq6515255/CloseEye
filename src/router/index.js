import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

const Home = () => import("../views/Home.vue");
const HomeRecommend = () => import("../views/HomeRecommend.vue");

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
        component: HomeRecommend
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
