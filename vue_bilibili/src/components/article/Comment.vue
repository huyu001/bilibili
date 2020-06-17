<template>
  <div class="comment" >
    <div class="content" v-for="(item,index) in comment" :key='index' >
        <div class="top">
        <div class="commentImg" v-if="item.userinfo">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
          <img src="~assets/img/user.jpg" alt="" v-else>
        </div>
        <div class="commentInfo"  v-if="item.userinfo">
          <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
      </div>
      <div class="article_bottom">
        {{item.comment_content}}
        <span class="replay" @click="replay(item)">回复</span>
      </div>
      <comment-item class="item" :temp='true' :childInfo='item.child' v-if="item.child" @postId='postId'></comment-item>
    </div>
   
  </div>
</template>

<script>
import CommentItem from './CommentItem';
export default {
data () {
  return {
    comment:[]
  }
},
components:{
  CommentItem
},
created () {
  this.getComment()
},
methods: {
  async getComment(){
    var res=await this.$http.get('/comment/'+this.$route.params.id)
    // 递归整合数据
    function dealData(attr){
      var newRes=[]
      var arr=res.data
      for(var i=0;i<arr.length;i++){
        if(arr[i].parent_id==attr){
          newRes.push(arr[i])
          arr[i].child=dealData(arr[i].comment_id)
        }
      }
      return newRes;
    }
    this.comment=dealData(null)
    // 将评论数量传递给父组件
    this.$emit('sendComments',this.comment.length)
  },
  replay(item){
    this.$emit('replay',item.comment_id)   
  },
  // 二级（包括二级）之后的评论
  postId(id){
    this.$emit('replay',id)
  }
}
}
</script>

<style lang='less'>
.comment{
  background-color: white;
  padding: 5px 5px 0 5px;
  .content{
    border-top: 1px solid #ddd;
  }
  .top{
    display: flex;
    align-content: center;
    .commentImg{
      margin:5px 5px 0 0 ;
      img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .commentInfo{  
      flex: 1;   
      p{
        width: 100%;
        padding: 0;
        margin: 10px 0 0 0;
        display: flex;
        justify-content: space-between;
        span{
          color:#555;
          
        }
        span:nth-child(2){
          width: 60px;
        }
      }
      
    }
  }
  .article_bottom{
    padding-left: 35px;
    position: relative;
    .replay{
      color: brown;
      position: absolute;
      right: 5px;
    }
  }
  .item{
    padding-left: 35px;
    box-sizing: border-box;
  }
}

</style>