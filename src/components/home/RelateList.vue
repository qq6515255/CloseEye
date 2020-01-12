<template>
      <div class="relate" v-if="listData!=={}">
      <div class="title">
        <span class="left" v-if="listData.type !==undefined">{{
          listData.name
        }}</span>
        <span class="right">more</span>
      </div>
      <ul class="content-list" v-if="listData.list.length>0">
        <li v-for="(item,index) in listData.list " :key="index" >
          <home-list-item :listInfo="item" ></home-list-item>
        </li>
      </ul>
    </div>
</template> 

<script>
import HomeListItem from "@/components/home/HomeListItem.vue"
export default {
  props:{
    listData:{
      type:Object,
      default:function () {
        return {}
      }
    }
  },
  components:{
  HomeListItem
  }
}
</script>

<style lang='less' scoped>

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
} 
  .relate{
    padding: 3vh 2vh;
     .title{
       overflow: hidden;
       padding:15px 0;
       line-height: 2vh;
       .left{
         float: left;
         font-weight: bold;
         line-height: 2vh;
       }
       .right{
         float: right;
         font-size: 12px;
         line-height: 2vh;
       }
     }
     .content-list{
       display: block;
       overflow-y:auto;
       white-space:nowrap;

       li{
         display:inline-block;
         width: 40vw;
         height: 25vw;
         margin-right: 20px;
         overflow: hidden;
         .list-item{
           height: 100% !important;
           width: 100% !important;
           img{
             height: 100% !important;
           }
         }
       }
     }
  }
</style>