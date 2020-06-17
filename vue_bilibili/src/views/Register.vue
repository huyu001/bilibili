<template>
  <div class="register">
    <!-- 头部区域 -->
    <register-top :middle="'注册'">
      <div slot="right" @click="switchTo()">切换到登录页</div>
    </register-top>
    <!-- 表单区域 -->
    <register-input name="姓名" label='姓名' style="margin:20px 0"
    placeholder="请输入姓名" rules="^.{2,8}$" @success='res=>name=res'></register-input>
    <register-input name="账号" label='账号' 
    placeholder="请输入账号" rules="^.{6,16}$" @success='res=>username=res'></register-input>
    <register-input name="密码" label='密码' type='password'
    placeholder="请输入密码" rules="^.{6,16}$"  @success='res=>password=res'></register-input>
    <!-- 按钮区域 -->
    <register-btn text='注册' style="margin:20px 0 0" @click="register"></register-btn>
    
  </div>
</template>

<script>
import RegisterTop from '@/components/common/RegisterTop';
import RegisterInput from '@/components/common/RegisterInput';
import RegisterBtn from '@/components/common/RegisterBtn';
export default {
components: {
  RegisterTop,
  RegisterInput,
  RegisterBtn
},
data () {
  return {
    name:'',
    username:'',
    password:''
  }
},
methods: {
  // 注册
  async register(){
    if(this.name&&this.username&&this.password){
      var res=await this.$http.post('/register',{
        name:this.name,username:this.username,password:this.password
      })
      localStorage.setItem('id',res.data.id)
      localStorage.setItem('token',res.data.objtoken)
      if(res.data.code==200){
        this.$message.success(res.data.msg);
        this.$router.push('/userInfo')
      }else{
        this.$message.fail(res.data.msg);
      }      
    }else if(!this.name){
       this.$message.fail('姓名格式错误');
    }else if(!this.username){
       this.$message.fail('账号格式错误');
    }else if(!this.password){
      this.$message.fail('密码格式错误');
    }  
  },
  switchTo(){
    this.$router.push('/login')
  }
   
},

watch: {
 
}
}
</script>

<style>

</style>