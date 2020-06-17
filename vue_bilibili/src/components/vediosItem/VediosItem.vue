<template>
  <div class="item" @click="push">
      <img :src="detail.img" referrer="no-referrer|origin|unsafe-url" alt="" v-if="detail.img">
      <img src="~assets/img/backImg.png" alt="" v-else>
      <div class="vedio_bottom">
        <span class="iconfont iconboshiweb_bofangliang">32.4万</span>
        <span class="iconfont iconpinglun">1.2万</span>
      </div>
      <p class="name">{{detail.name}}</p>
    </div> 
  </div>
</template>

<script>
export default {
props: ['detail'],
methods: {
  push(){
    this.$router.push(`/article/${this.detail.id}`)
  }
}
}
</script>

<style lang='less'>
.item{
  width: 100%;
  position: relative;
 
  .vedio_bottom{
    overflow: hidden;
    border-radius:0 0 10px 10px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 17px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color: white;
    background: -webkit-linear-gradient(top,rgb(207, 204, 204),#6e6d6c) no-repeat;;
    p{
      padding: 0px;
      margin:0;
    }
    span{
    // display: inline-block;
    font-size: 12px;
   }
    span:nth-child(2){
      margin-right: 10px;
    }
  }
  .name{
    overflow: hidden;
    text-overflow: ellipsis;/*使溢出文字以省略号显示*/
    white-space: nowrap;/*使文字在同一行显示，不换行*/
  }
  
  
}
.item img{
  width: 100%;
  height: 117px;
  border-radius: 10px;
  overflow: hidden;
}
.name{
  padding: 0 0 0 5px;
  margin: 0;
  font-size: 12px;
}
</style>