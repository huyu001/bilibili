<template>
  <div class="details">
    <div class="user-top">
      <div class="user-top-left">
        <img :src="details.img" alt="" v-if="details.img">
        <img src="~assets/img/user.jpg" v-else alt="">
      </div>
      <div class="user-top-right">
        <div class="right-top">
          <span>
          <p>粉丝</p>
          <p>0</p>
        </span>
        <span>
          <p>关注</p>
          <p>0</p>
        </span>
        <span>
          <p>获赞</p>
          <p>0</p>
        </span>
        </div>
        <div class="right-bottom">
          <div class="edit" @click="editClick" >编辑资料</div>
        </div>
      </div>
    </div>
    <div class="user-bottom">
      <p>昵称：{{details.username}}</p>
      <p>
        <span v-if="details.desc">个性签名：{{details.desc}}</span>
        <span v-else>个性签名：这个人很懒，什么描述也没有</span>
      </p>
      <p>id:{{details.id}}</p>
    </div>
  </div>  
</template>

<script>

export default {
props: ['details'],
methods: {
  editClick(){
    this.$emit('edit')
  }
}
}
</script>

<style lang='less'>
.details{
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  .user-top{
    flex:1;
    width: 100%;
    display: flex;
    .user-top-left{
      width: 65px;
      height: 65px;
      img{
      width: 65px;
      height: 65px;
      border-radius: 50%;
      position: relative;
      bottom: 10px;
      }
    
    }
    .user-top-right{
      flex: 1;
    margin-left: 50px;
    span{
      display: inline-block;
      margin-top: 6px;
      padding: 0 20px;
      border-right: 1px solid #aaa;
      p{
        padding: 0;
        margin:3px;
        text-align: center;
        font-size: 14px;   
      }
      p:nth-child(2){
          color:#bbb;
      } 
    } 
      span:nth-child(3){
        border:0
      }
    .right-bottom{
      margin-top: 10px;
      .edit{
        width: 100%;
        height: 35px;
        border: 2px solid pink;
        border-radius: 5px;
        text-align: center;
        line-height: 35px;
        color: pink;
        letter-spacing: ;
      }
    }
    }
  }
  .user-bottom{
    width: 100%;
    margin-top: 10px;
    p{
      margin:0;
      padding:5px;
      color:#bbb
    }
    p:nth-child(1){
      color:black
    }
  }
}

</style>