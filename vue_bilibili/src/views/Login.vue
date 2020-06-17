<template>
  <div class="register">
    <!-- 头部区域 -->
    <register-top :middle="'登录'">
      <div slot="right" @click="switchTo()">切换到注册页</div>
    </register-top>
    <!-- 表单区域 -->
    <register-input name="账号" label='账号' style="margin:30px 0 10px"
    placeholder="请输入账号" rules="^.{6,16}$" @success='res=>username=res'></register-input>
    <register-input name="密码" label='密码' type='password'
    placeholder="请输入密码" rules="^.{6,16}$"  @success='res=>password=res'></register-input>
    <!-- 按钮区域 -->
    <register-btn text='登录' style="margin:20px 0 0" @click="register"></register-btn>
    
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
    username:'',
    password:''
  }
},
methods: {
  // 登录
  async register(){
    if(this.username&&this.password){
      var res=await this.$http.post('/register',{
        username:this.username,password:this.password
      })
      console.log(res);
      if(res.data.code==200){
        this.$message.success(res.data.msg);
        this.$router.push('/userinfo')
      }else{
        this.$message.fail(res.data.msg);
      }      
    }else if(!this.username){
       this.$message.fail('账号格式错误');
    }else if(!this.password){
      this.$message.fail('密码格式错误');
    }  
  },
  switchTo(){
    this.$router.push('/register')
  }
   


},

watch: {
 
}
}
</script>

<style>

</style>