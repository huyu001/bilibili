<template>
  <div class="edit">
    <!-- 头部导航栏 -->
    <nav-bar></nav-bar>
    <!-- 资料详情 -->
    <div class="details" style="margin:5px 0">
      <user-info-item title="头像">
        <van-uploader :after-read="afterRead"  slot='right' >
          <img :src="userInfo.user_img" v-if="userInfo.user_img" alt="" style="border-radius:50%;width:40px;height:40px">
          <img src="~assets/img/user.jpg" v-else alt="" style="border-radius:50%;width:35px;">
        </van-uploader>
      </user-info-item>
      <user-info-item title="姓名" :value='userInfo.name' @editClcik='editName'></user-info-item>
      <user-info-item title="昵称" :value='userInfo.username' @editClcik='editUserName'></user-info-item>
      <user-info-item title="id" :value='userInfo.id'></user-info-item>
      <user-info-item title="性别" :value='userInfo.gender==="0"?"男":"女"' @editClcik='showPop'></user-info-item>
      <user-info-item title="个性签名" :value='userInfo.user_desc' @editClcik="editUserdesc"></user-info-item>
    </div>
    <!-- 对话框 -->
    <van-dialog v-model="editNameShow" title="编辑" show-cancel-button @confirm='confirmName'>
        <van-field v-model="value_name" :label="nameLabel" />
    </van-dialog>
    <van-dialog v-model="editUsernameShow" title="编辑" show-cancel-button @confirm='confirmUserName'>
        <van-field v-model="value_username" :label="usernameLabel" />
    </van-dialog>
    <van-dialog v-model="editdescShow" title="编辑" show-cancel-button @confirm='confirmdesc'>
        <van-field v-model="value_desc" :label="descLabel" />
    </van-dialog>
    <van-action-sheet v-model="popShow" :actions="actions" @select="onSelect" />
    <!-- 返回个人信息页 -->
    <div class="back" @click="back">返回个人信息页</div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import UserInfoItem from '@/components/editUserinfo/UserInfoItem';
export default {
components: {
  NavBar,
  UserInfoItem
},
data () {
  return {
    userInfo:{
      name:'',
      username:'',
      id:'',
      gender:'',
      user_img:'',
      user_desc:''
    },
    editNameShow:false,
    nameLabel:"",
    value_name:'',
    editUsernameShow:false,
    usernameLabel:"",
    value_username:'',
    // 
    editdescShow:false,
    descLabel:"",
    value_desc:'',
    popShow:false,
    actions:[{ name: '男',id:0 }, { name: '女',id:1 }],
  }
},
created () {
  this.getUserInfo()
},
methods: {
  async getUserInfo(){
    var {data:res}=await this.$http.get('/user/'+localStorage.getItem('id'))
    res=res[0]
    console.log(res);
    this.userInfo.name=res.name
    this.userInfo.username=res.username
    this.userInfo.id=res.id
    this.userInfo.user_desc=res.user_desc
    this.userInfo.user_img=res.user_img
    this.userInfo.gender=res.gender
  },
  // 更新上传服务端
  async UpdeteUserInfo(){
    var res=await this.$http.post('/update/'+localStorage.getItem('id'),this.userInfo)
  },
  // 文件上传回调
  async afterRead(file){
    var fromdata=new FormData()
    fromdata.append('file',file.file)
    var res=await this.$http.post('/upload',fromdata)
    if(res.status===200){
      this.$message.success('上传成功')  
      this.userInfo.user_img=res.data.url
      this.UpdeteUserInfo()
      this.getUserInfo()
    }
  },
  editName(title,value){
    this.editNameShow=true
    this.nameLabel=title
    this.value_name=value
  },
  confirmName(){
    this.userInfo.name=this.value_name
    this.UpdeteUserInfo()
  },
  editUserName(title,value){
    this.editUsernameShow=true
    this.usernameLabel=title
    this.value_username=value
  },
  confirmUserName(){
    this.userInfo.username=this.value_username
    this.UpdeteUserInfo()
  },
  editUserdesc(title,value){
    // console.log('12');
    this.editdescShow=true
    this.descLabel=title
    this.value_desc=value
  },
  confirmdesc(){
    this.userInfo.user_desc=this.value_desc
    this.UpdeteUserInfo()
  },
  back(){
    this.$router.push('/userinfo')
  },
  showPop(){
    this.popShow=true
  },
  onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.popShow = false;
      this.userInfo.gender=item.id
      this.UpdeteUserInfo()
    },
}
}
</script>

<style lang='less'>
.back{
  width: 80%;
  height: 40px;
  background-color: pink;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  color: white;
  margin: 80px auto;
}

</style>