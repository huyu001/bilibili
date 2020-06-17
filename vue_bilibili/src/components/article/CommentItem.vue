<template>
  <div class="commentItem">
    <div class="item_content" v-for="(item,index) in childInfo" :key="index">
      <div class="top">
        <div class="commentImg" v-if="item.userinfo">
          <img :src="item.userinfo.user_img" alt v-if="item.userinfo.user_img" />
          <img src="~assets/img/user.jpg" alt v-else />
        </div>
        <div class="commentInfo" v-if="item.userinfo">
          <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
      </div>
      <!-- 二级（包括二级）之后的回复 -->
      <div class="bottom" v-if="!temp">
        回复
        <span style="color:blue">@{{item.parent_user_info.name}}:</span>
        {{item.comment_content}}
        <span class="replay" @click="replayItem(item.comment_id)">回复</span>
      </div>
      <!-- 一级回复 -->
      <div class="bottom" v-else>
        {{item.comment_content}}
        <span class="replay" @click="replayItem(item.comment_id)">回复</span>
      </div>
      <!-- 二级（包括二级）之后的回复 -->
      <comment-item :childInfo="item.child" v-if="item.child" @postId="postId"></comment-item>
    </div>
  </div>
</template>

<script>
import eventBus from "@/assets/js/eventBus.js";
export default {
  name: "CommentItem",
  //父组件传入标记变量temp 子组件通过temp判断是一级渲染还是组件内调用组件的二次渲染
  props: ["childInfo", "temp"],
  methods: {
    replayItem(id) {
      // 传递给父级id
      this.$emit("postId", id);
    },
    postId(id) {
      this.replayItem(id);
    }
  }
};
</script>

<style lang='less' scoped>
.bottom {
  padding-top: 5px;
  position: relative;
  .replay {
    color: brown;
    position: absolute;
    right: 5px;
  }
}
</style>