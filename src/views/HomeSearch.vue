<template>
  <div class="main bgc">
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
    <template v-if="isResultshow">
      <div class="result-box">
        <div class="nav"></div>
        <div class="result">
          <h3 class="title" v-if="showtitle">{{ resultList.msg }}</h3>
        </div>
      </div>
    </template>

    <div class="control" v-show="control">
      <div class="hotwords">
        <h3 class="title">热门搜索</h3>
        <ul class="keywords" v-if="hotWord !== null">
          <li v-for="(item, index) in hotWord" :key="index">{{ item.kw }}</li>
        </ul>
      </div>

      <div class="histoyr hotwords">
        <p class="title">
          搜索历史 <span class="clear" @click="clearHistory">清除<van-icon name="delete"/></span>
        </p>
        <ul class="keywords" v-if="historyList !== null">
          <li v-for="(item, index) in historyList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch } from "@/api/home";
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
      if (this.resultList.msg !== "ok") {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      value: null,
      resultList: null,
      hotWord: null,
      historyList: null,
      control: true
    };
  },
  methods: {
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
          // 控制开关
          if (this.resultList.msg !== "ok") {
            this.control=true;
          }else{
            this.control=false;
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
    }
  },
  watch: {
    historyList() {
      localStorage.setItem("HomeSearchHistory", JSON.stringify(this.historyList));
    },
    value() {
      if (this.value === "" || this.value === null) {
        this.resultList = null;
        this.control=true;
      }
    }
  }
};
</script>

<style lang="less">
.bgc {
  background-color: #1a1a1a;
}
.main {
  overflow: hidden;
  position: relative;
  height: 100vh;
  .input {
    margin-bottom: 20px;
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
      color: #a7a7a7 !important;
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
  .result {
    text-align: center;
    font-size: 12px;
    color: white;
    .title {
      padding: 100px, 50px;
      text-align: center;
      font-size: 12px;
      color: white;
    }
  }
}
</style>
