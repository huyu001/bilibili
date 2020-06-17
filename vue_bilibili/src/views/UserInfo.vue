<template>
  <div class="user">
    <nav-bar></nav-bar>
    <img src="~assets/img/backImg.png"  alt="" style="width:100%;height:150px">
    <user-details :details='details' @edit='editUser'></user-details>
    <!-- 底部标签 -->
    <van-tabbar v-model="active" route active-color="pink">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/userinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import RegisterBtn from '@/components/common/RegisterBtn';
import UserDetails from '@/components/userInfo/UserDetails';


export default {
components: {
  NavBar,
  RegisterBtn,
  UserDetails
},
data () {
  return {
    details:{
      username:'',
      id:'',
      desc:'',
      img:''  
    },
    active:0
   
  }
},
created () {
  this.getUserInfo()
},
methods: {
  async getUserInfo(){
    var {data:res}=await this.$http.get('/user/'+localStorage.getItem('id'))
      this.details.username=res[0].username
      this.details.id=res[0].id
      this.details.img=res[0].user_img
      this.details.desc=res[0].user_desc
  },
  editUser(){
    this.$router.push('/edit')
  }
}
}
</script>

<style>

</style>