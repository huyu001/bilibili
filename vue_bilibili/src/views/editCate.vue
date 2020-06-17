<template>
  <div class="editCate">
    <nav-bar></nav-bar>
    <div class="cate">
      <van-divider
        dashed
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >现有栏目</van-divider>
      <div class="nowcateContent">
        <div
          class="nowCateItem"
          @click="nowcateClick(index)"
          v-for="(item,index) in nowCate"
          :key="index"
        >{{item.title}}</div>
      </div>
      <van-divider dashed :style="{ color: 'red', borderColor: 'red', padding: '0 16px' }">移除栏目</van-divider>
      <div class="removecateContent">
        <div
          class="removeCateItem"
          @click="removecateClick(index)"
          v-for="(item,index) in removeCate"
          :key="index"
        >{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      nowCate: [],
      removeCate: []
    };
  },
  created() {
    if (localStorage.getItem("nowcate")) {
      this.nowCate = JSON.parse(localStorage.getItem("nowcate"));
      this.removeCate = JSON.parse(localStorage.getItem("removecate"));
    } else {
      this.getCateList();
    }
  },
  methods: {
    async getCateList() {
      var res = await this.$http.get("/category");
      this.nowCate = res.data;
    },
    nowcateClick(index) {
      if(this.nowCate.length===1){
        return this.$message.fail('不能继续移除了')
      }
      this.removeCate.push(this.nowCate[index]);
      this.nowCate.splice(index, 1);
    },
    removecateClick(index) {
      this.nowCate.push(this.removeCate[index]);
      this.removeCate.splice(index, 1);
    }
  },
  watch: {
    nowCate() {
      localStorage.setItem("nowcate", JSON.stringify(this.nowCate));
    },
    removeCate() {
      localStorage.setItem("removecate", JSON.stringify(this.removeCate));
    }
  }
};
</script>

<style lang='less'>
.cate {
  padding: 0 10px;
  // display: flex;
  .nowcateContent {
    .nowCateItem {
      display: inline-block;
      width: 20%;
      height: 35px;
      border: 1px solid #1989fa;
      margin: 7px;
      text-align: center;
      line-height: 35px;
      color: #1989fa;
    }
  }
  .removecateContent {
    .removeCateItem {
      display: inline-block;
      width: 20%;
      height: 35px;
      border: 1px solid red;
      margin: 7px;
      text-align: center;
      line-height: 35px;
      color: red;
    }
  }
}
</style>