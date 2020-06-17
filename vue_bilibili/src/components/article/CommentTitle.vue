<template>
  <div class="title">
    <p>评论</p>
    <span>({{commentsLength}})</span>
    <p>
      <img :src="user.user_img" alt v-if="user.user_img" />
      <img src="~assets/img/user.jpg" v-else alt />
      <input type="text" placeholder="请发表你的言论" class="input" v-model="content" />
      <button @click="publish">发布</button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["commentsLength"],
  data() {
    return {
      user: {},
      content: ""
    };
  },
  methods: {
    async getUserMy() {
      var res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.user = res.data[0];
    },
    publish() {
      if (localStorage.getItem("token") && localStorage.getItem("id")) {
        this.$emit("sendComment", this.content);
        this.content = "";
      } else {
        this.$message.fail("请先进行登录");
      }
    },
    // input输入框聚焦
    onfocus() {
      document.querySelector(".input").focus();
    }
  }
};
</script>

<style lang='less'>
.title {
  background-color: white;
  margin-top: 10px;
  p:nth-child(1) {
    display: inline-block;
    margin-right: 5px;
  }
  span {
    color: #bbbbbb;
  }
  p {
    padding: 5px;
    margin: 0;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
    input {
      outline: none;
      border: 0;
      background-color: #f4f4f4;
      height: 25px;
      width: 60%;
      border-radius: 10px;
      font-size: 14px;
      padding: 5px 10px;
    }
    button {
      color: white;
      width: 60px;
      height: 35px;
      border-radius: 12px;
      background-color: pink;
      border: 0;
      letter-spacing: 2px;
      margin-left: 10px;
    }
  }
}
</style>