<template>
  <div class="item" @click="editClick">
      <van-cell :title="title" :value="value" center border>
        <slot name='right' class="right"></slot>
      </van-cell>
  </div>
</template>

<script>
export default {
props: ['title','right','value'],
methods: {
  editClick(){
    this.$emit('editClcik',this.title,this.value)
  }
}
}
</script>

<style lang='less'>

.item{
  position: relative;
  width: 100%;
  .van-cell {
  width:100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  padding: 2px 16px;
    .van-cell__value{
      padding: 5px 0 0 0;
    }
  }
  
}

</style>