<template>
  <div class="article">
    <!-- 头部导航 -->
    <nav-bar></nav-bar>
    <!-- 视频 -->
    <div class="vedioInfo">
      <div class="video">
        <video :src="articleContent.content" controls="controls"></video>
      </div>
      <div class="detailInfo">
        <span>{{category.title}}</span>
        <p>{{articleContent.name}}</p>
        <span>{{articleContent.date}}</span>
      </div>
      <div class="user">
        <span>作者：{{userInfo.name}}</span>
        <div class="hot">
          <span>播放量:3560</span>
          <span style="margin-left:30px">弹幕:86</span>
        </div>
      </div>
      <div class="operator">
        <span class="iconfont iconshoucang" :class="{activeCollect:isActive}" @click="collect">收藏</span>
        <span class="iconfont iconhuancun">缓存</span>
        <span class="iconfont iconiconzhengli_fenxiang">分享</span>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <comment-title
        :commentsLength="commentsLength"
        ref="commentTitleRef"
        @sendComment="getContent"
      ></comment-title>
      <comment @sendComments="receiveComments" ref="commentRef" @replay="replay"></comment>
    </div>
    <!-- 推荐 -->
    <div class="wrapper">
      <vedios-item class="item_vedios" v-for="(item,index) in commend" :detail="item" :key="index"></vedios-item>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import VediosItem from "@/components/vediosItem/VediosItem";
import CommentTitle from "@/components/article/CommentTitle";
import Comment from "@/components/article/Comment";
export default {
  components: {
    NavBar,
    VediosItem,
    CommentTitle,
    Comment
  },
  data() {
    return {
      articleContent: {},
      userInfo: {},
      category: {},
      commend: [],
      params: this.$route.params.id,
      commentsLength: 0,
      commentParams: {
        article_id: 0,
        comment_content: "",
        comment_date: "",
        parent_id: null
      },
      isActive: true
    };
  },
  created() {
    this.getVedioDetail();
    this.getCommend();
    this.getCollectDetail();
  },
  methods: {
    async getVedioDetail() {
      var res = await this.$http.get(`/article/${this.$route.params.id}`);
      this.articleContent = res.data[0];
      console.log(this.articleContent);
      this.userInfo = this.articleContent.userinfo;
      this.category = this.articleContent.category;
    },
    async getCommend() {
      var res = await this.$http.get("/commend");
      this.commend = res.data;
    },
    receiveComments(len) {
      this.commentsLength = len;
    },
    // 接收评论内容
    getContent(content) {
      this.commentParams.comment_content = content;
      this.commentParams.article_id = this.$route.params.id;
      var date = new Date();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      d < 10 ? "0" + d : d;
      this.commentParams.comment_date = m + "-" + d;
      this.publishComment();
      // 每次发布评论后 父级id重置
    },
    // 发布评论
    async publishComment() {
      var res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.commentParams
      );
      // 调用子组件方法刷新页面
      this.$refs.commentRef.getComment();
      this.commentParams.parent_id = "";
      // 评论数加1
      this.commentsLength+=1;
    },
    replay(id) {
      this.commentParams.parent_id = id;
      this.$refs.commentTitleRef.onfocus();
    },
    // 获取收藏
    async getCollectDetail() {
      if (localStorage.getItem("token")) {
        var res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: { article_id: this.$route.params.id }
          }
        );
        this.isActive = res.data.success;
      }
    },
    // 点击收藏
    async collect() {
      if (localStorage.getItem("token")) {
        var res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          {
            article_id: this.$route.params.id
          }
        );
        if (res.data.msg === "收藏成功") {
          this.isActive = true;
          this.$message.success("收藏成功");
        } else {
          this.isActive = false;
          this.$message.success("取消收藏");
        }
      }
    }
  },
  watch: {}
};
</script>

<style lang='less'>
.article {
  .vedioInfo {
    width: 100%;
    background-color: #fff;
    color: rgb(110, 112, 110);
    .video {
      video {
        width: 100%;
      }
    }
    .detailInfo {
      font-size: 14px;
      padding: 0 10px;
      span:nth-child(1) {
        background-color: rgb(231, 168, 179);
        padding: 1px 2px 0 2px;
        margin-right: 5px;
        font-size: 12px;
        border-radius: 5px;
      }
      p {
        padding: 0;
        margin: 0 0px 0 0;
        display: inline-block;
      }
    }
    .operator {
      padding: 5px 10px;
      span {
        padding-right: 10px;
      }
    }

    .user {
      padding: 0 10px;
      margin-top: 10px;
      font-size: 12px;
      .hot {
        display: inline-block;
        margin-left: 115px;
      }
    }
  }
  .wrapper {
    padding: 0 5px;
  }
  .activeCollect {
    color: pink;
  }
}
</style>