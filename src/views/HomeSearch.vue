<template>
  <v-touch
    v-on:swipeleft="swiperleft"
    v-on:swiperight="swiperright"
    class="wrapper"
    :swipe-options="{ direction: 'horizontal' }"
  >
    <div class="Searchmain bgc menu-container" ref="menuContainer">
      <div class="input">
        <form action="/">
          <van-search
            v-model.trim="value"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="onCancel"
            :clearable="false"
            :autofocus="true"
            background="#1A1A1A"
          >
            <van-icon name="search" slot="left-icon" />
          </van-search>
        </form>
      </div>

      <!-- 结果的词条 -->
      <transition name="fade">
        <template v-if="isResultshow">
          <div class="result-box">
            <div class="nav">
              <van-dropdown-menu class="bgc" active-color="#e2e2e2">
                <van-dropdown-item v-model="value1" :options="option1" />
                <van-dropdown-item v-model="value2" :options="option2" />
                <!-- <van-dropdown-item v-model="value3" :options="option3" /> -->
              </van-dropdown-menu>
            </div>
            <div class="result">
              <h3 class="title-error" v-if="showtitle">{{ resultList.msg }}</h3>
              <h3 class="total" v-if="!showtitle">{{ resultList.data.result.total }} 个相关影片</h3>
              <van-list
                v-if="loadList !== null && resultList.data.result"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
                :error.sync="error"
                error-text="加载失败,点击重试"
              >
                <home-list
                  v-for="(item, index) in loadList"
                  :key="index"
                  :listData="item"
                ></home-list>
              </van-list>
            </div>
          </div>
        </template>
      </transition>
      <div class="control" v-show="control">
        <div class="hotwords">
          <h3 class="title">热门搜索</h3>
          <ul class="keywords" v-if="hotWord !== null">
            <li v-for="(item, index) in hotWord" :key="index" @click="onItemClick(item.kw)">
              {{ item.kw }}
            </li>
          </ul>
        </div>

        <div class="histoyr hotwords">
          <p class="title">
            搜索历史 <span class="clear" @click="clearHistory">清除<van-icon name="delete"/></span>
          </p>
          <ul class="keywords" v-if="historyList !== null">
            <li v-for="(item, index) in historyList" :key="index" @click="onItemClick(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </v-touch>
</template>

<script>
import { getSearch } from "@/api/home";
import HomeList from "@/components/home/HomeList";
import { AGENT } from "@/api/base";
export default {
  created() {
    let localData = localStorage.getItem("HomeSearchHistory");
    this.historyList = localData ? JSON.parse(localData) : [];

    getSearch().then(res => {
      if (res.status === 200 && res.data.data !== null) {
        this.hotWord = res.data.data.recommend_keywords;
      }
    });
  },
  computed: {
    isResultshow() {
      return this.resultList !== null && this.value !== null && this.value !== "";
    },

    showtitle() {
      if (this.resultList == null) {
        return false;
      }

      if (this.resultList.msg !== "ok") {
        return true;
      } else {
        return false;
      }
    },
    option1() {
      if (this.resultList !== null) {
        let iteamlist = this.resultList.data.filter.type;
        let list = iteamlist.map(item => {
          return { text: item.key, value: item.value };
        });
        return list;
      } else {
        return [];
      }
    },
    option2() {
      if (this.resultList !== null) {
        let iteamlist = this.resultList.data.order;
        let list = iteamlist.map(item => {
          return { text: item.key, value: item.value };
        });
        return list;
      } else {
        return [];
      }
    },
    nextUrl() {
      if (this.loadList.length > 0) {
        return AGENT + this.loadList[this.loadList.length - 1].next_page_url_full;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      value: null,
      resultList: null,
      hotWord: null,
      historyList: null,
      control: true,
      loadList: [],
      error: false,
      loading: false,
      finished: false,
      value1: "post",
      value2: "default",
      value3: 0
    };
  },
  methods: {
    onLoad() {
      if (this.nextUrl !== null) {
        this.axios(this.nextUrl).then(res => {
          if (res.data.data !== undefined) {
            window.console.log("加载数据", res.data.data);
            this.loadList.push(res.data.data.result);
            this.loading = false;
          } else {
            window.console.log("flase===>", this.nextUrl);
            this.loading = false;
            this.error = true;
          }
        });
      }
    },
    onSearch() {
      let index = this.historyList.indexOf(this.value);
      if (index === -1) {
        this.historyList.unshift(this.value);
      } else {
        let temp = this.historyList[index];
        this.historyList.splice(index, 1);
        this.historyList.unshift(temp);
      }
      getSearch(this.value).then(res => {
        if (res.status === 200 && res.data !== null) {
          this.resultList = res.data;
          if (res.data.data.result !== undefined) {
            this.loadList.push(res.data.data.result);
          }
          // 控制开关
          if (this.resultList.msg !== "ok") {
            this.control = true;
          } else {
            this.control = false;
          }
        }
      });
    },
    onCancel() {
      this.value = null;
      this.$router.back();
    },
    clearHistory() {
      this.historyList = [];
    },
    onItemClick(e) {
      this.value = e;
      this.onSearch();
    },
    swiperleft: function() {
      window.console.log("right");
      
    },
    swiperright: function() {
      window.console.log("left");
      this.$router.back();
    }
  },
  watch: {
    historyList() {
      localStorage.setItem("HomeSearchHistory", JSON.stringify(this.historyList));
    },
    value() {
      if (this.value === "" || this.value === null) {
        this.resultList = null;
        this.control = true;
        this.value1 = "post";
        this.value2 = "default";
        this.loadList = [];
      }
    }
  },
  components: {
    HomeList
  }
};
</script>

<style lang="less">
.bgc {
  background-color: #1a1a1a !important;
}
.Searchmain {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  .input {
    padding: 8px;
  }
  .van-search {
    i {
      color: #a7a7a7 !important;
    }
    color: #a7a7a7;
    font-size: 20px;
    .van-search__content {
      background-color: #3e3d3d !important;
    }
    .van-field__control {
      color: #e2e2e2 !important;
    }
    .van-search__action {
      color: #a7a7a7;
    }
  }
  .hotwords {
    width: 100%;
    padding: 0px 20px;
    overflow: hidden;
    .title {
      font-size: 16px;
      color: #686868;
      text-align: left;
      margin: 10px 0px;
      overflow: hidden;
      line-height: 20px;
      font-weight: 700;
    }
    .keywords {
      overflow: hidden;
      padding: 5px 0px;
      li {
        float: left;
        padding: 10px;
        color: white;
        font-size: 12px;
        text-align: center;
        margin: 5px 10px 5px 0px;
        line-height: 16px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }
    }
  }
  .histoyr {
    margin-top: 10px;
    .title {
      .clear {
        float: right;
        vertical-align: middle;
        line-height: 20px;
        i {
          margin-left: 5px;
          line-height: 20px;
          vertical-align: middle;
        }
      }
    }
  }
  .result-box {
    .nav {
      height: 51px;
      border-bottom: 1px solid #a7a7a730;
      .van-dropdown-item__option {
        background-color: #1a1a1a;
        color: #b6b6b6;
        &::after {
          border: none;
        }
        border-bottom: 0px solid #ebedf0;
        padding: 15px;
      }
      .van-dropdown-item__option--active {
        background-color: #272727;
      }
      .van-dropdown-menu {
        .van-dropdown-menu__title {
          font-size: 14px;
          color: #a7a7a7;
        }
        &::after {
          border: none;
        }
      }
    }
  }
  .result {
    text-align: center;
    font-size: 12px;
    color: white;
    .title-error {
      padding: 100px, 50px;
      text-align: center;
      font-size: 12px;
      color: white;
    }
    .total {
      width: 100%;
      padding: 2vh 5vw;
      font-size: 5px;
      text-align: left;
      font-size: 12px;
      color: #a7a7a7;
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
