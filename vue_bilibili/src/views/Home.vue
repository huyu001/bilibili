<template>
  <div class="home">
    <!-- 头部导航区域 -->
    <nav-bar></nav-bar>
    <!-- 标签栏 -->
    <div class="tab">
      <span class="expand" @click='$router.push("/editCate")'><van-icon name="setting-o" size='25px'/></span>
      <van-tabs  @click="tabClick" v-model="active" sticky>
        <van-tab v-for="item in cateList" :title="item.title" :key='item._id'></van-tab>
          <!-- 内容栏 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad" :immediate-check='false' loading-text='加载中'>
              <div class="wrapper">
                <vedios-item class="item_vedios" v-for="item in cateItem"  :detail='item'></vedios-item>
              </div>
          </van-list>  
          
        
      </van-tabs>   
    </div>
   <!-- 底部标签 -->
    <van-tabbar v-model="tabActive" route active-color="pink">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/userinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import VediosItem from '@/components/vediosItem/VediosItem';
export default {
  name: 'Home',
  components: {
    NavBar,
    VediosItem
  },
  data () {
    return {
      cateList:[],
      active:0,
      queryInfo:{
        page:0,
        pagesize:10
      },
      cateItem:[],
      loading: false,
      finished: false,
      tabActive:0
    }
  },
  created () {
    if(!localStorage.getItem('nowcate')){
      this.getCatList()    
    }else{
      this.cateList=JSON.parse(localStorage.getItem('nowcate'))
    }
    this.getCartVedios()
},
  methods: {
    async getCatList(){
      var res=await this.$http.get('/category')
      this.cateList=res.data
      console.log(this.cateList);
      
    },
    async getCartVedios(){
      var res=await this.$http.get('/detail/'+this.cateList[this.active]._id,
      {params:this.queryInfo})
      console.log(res);
      res.data.forEach(item=>{
        this.cateItem.push(item)
      })
      if(res.data.length<this.queryInfo.pagesize){
        this.finished = true;
      }
    },
    tabClick(name,title){
      // 每次切换tab 清空cateItem page
      this.cateItem=[]
      this.queryInfo.page=0
      this.finished=false
     this.getCartVedios()
    },
    onLoad(){
      this.queryInfo.page+=1
      this.getCartVedios()
      this.loading = false;
    },
   
  },
  activated(){
    this.cateList=JSON.parse(localStorage.getItem('nowcate'))
  }
}
</script>
<style lang="less">
.wrapper{
  display: flex;
  flex-wrap: wrap;
  padding:2px;
  justify-content: space-between;
  margin-top: 5px;
  .item_vedios{
    width: 48%;
    height: 100%;
  }
}
.home{
  .tab{
    position: relative;
    .expand{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 9;
      display: inline-block;
      width: 44px;
      height: 44px;
      background-color: #fff;
      text-align: center;
      padding-top: 10px;
      box-sizing: border-box;
    }
    .van-sticky{
      margin-right: 44px;
    }
    
  }
}
</style>
