<template>
  <div class="input">  
     <van-field
      v-model="content"
      :name="name"
      :label='label'
      :placeholder="placeholder"
      :rules="[{ required: true, message: '请填写密码' }] "
      :type='type'/>
  </div>
</template>

<script>
export default {
props:{
  name:'',
  label:'',
  placeholder:'',
  rules:'',
  type:''
},
data () {
  return {
    content:''
  }
},
methods: {
  test(){
    const reg=new RegExp(this.rules)
    if(reg.test(this.content)){
      this.$emit('success',this.content)
    }
  }
},
watch: {
  content(){
    this.test()
  }
}
}

</script>

<style lang="less" scoped>
.van-button{
  background-color:  pink !important;
  border-color: pink!important;
}
</style>