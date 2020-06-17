<template>
  <div class="registerTop">
    <div class="left">{{left}}</div>
    <div class="middle">{{middle}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
props:{
  left:'',
  middle:'',
  right:''
}
}
</script>

<style lang="less" scoped>
.registerTop{
  display: flex;
  height: 39.998px;
  background-color: pink;
  div{
    flex: 1;
    color:white;
    line-height: 39.998px;
    text-align: center;
  }
}
.right{
  font-size: 12px;
}
</style>

