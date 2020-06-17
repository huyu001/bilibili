<template>
  <div id="app">
    <keep-alive>
      <router-view  v-if="$route.meta.isKeepAlive" :key='key'></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" :key='key'></router-view>
   
  </div>
</template>

<script>
export default {
  data () {
    return {
      active:0  
    }
  },
  computed: {
    // 给router-view加个唯一的key，来保证路由切换时都会重新渲染触发钩子了
    key(){
      return this.$route.params.id+0
    }
  }
}
</script>
<style>
</style>