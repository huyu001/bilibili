<template>
  <div class="registerBtn">
    <van-button plain type="info" id="btn" @click="btnClick">{{text}}</van-button>
  </div>
</template>

<script>
export default {
props: ["text"],
methods: {
  btnClick(){
    this.$emit('click')
  }
}
}
</script>

<style>
.registerBtn{
  display: flex;
  align-self: center;
  justify-content: center;
}
#btn{
  border-radius: 2vw;
  width: 90%;
  background-color: pink;
  border-color: pink;
  color: white;
}
</style>