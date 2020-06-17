<template>
  <div class="navbar">
    <div class="left" @click="$router.back()">
      <img src="~assets/img/logo.png" alt />
    </div>
    <div class="mid">
      <div class="search">
        <van-icon name="search" size="20px" color="white" />
      </div>
    </div>
    <div class="right">
      <div class="user" @click="toDetails">
        <img :src="user.user_img" alt v-if="user" />
        <img src="~assets/img/user.jpg" v-else alt />
      </div>
      <div class="dowload">下载APP</div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/assets/js/eventBus.js";
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    toDetails() {
      this.$router.push("/userInfo");
    },
    async getUserinfo() {
      // 请求数据前验证本地是否有token id
      if (localStorage.getItem("token") && localStorage.getItem("id")) {
        var res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.user = res.data[0];
      }
    }
  }
};
</script>

<style lang='less'>
.navbar {
  height: 45px;
  display: flex;
  background-color: #fff;
  img {
    height: 45px;
  }
  .mid {
    flex: 1;
    .search {
      height: 30px;
      margin: 8px 5px 0;
      background-color: #eee;
      border-radius: 10px;
      .van-icon {
        margin: 5px 5px 0;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 106px;
    .dowload {
      background-color: #fb7299;
      width: 100px;
      text-align: center;
      line-height: 35px;
      color: white;
      height: 35px;
      font-size: 14px;
      border-radius: 5px;
      margin: 0 5px;
      padding: 0 5px;
    }
    .user img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-top: 5px;
    }
  }
}
</style>