<template>
  <div class="main" v-if="dayCoverDate!=={}">

  </div>
</template>

<script>
export default {
 props:{
   dayCoverDate:{
     type:Object,
     default:function(){
       return {}
     }
   }
 }
}
</script>

<style lang='less' scoped>
.main{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgb(0, 0, 0);
  .cover{

  }
}
 
</style>