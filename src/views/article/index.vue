<template>
  <div class="article-container" ref="detail"  @scroll="scroll()">
    <van-nav-bar fixed left-text="返回" @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <van-loading v-if="loading" />
    <div v-else-if="article.title" class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|calcTime}}</p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
      <comment :articleId="article.art_id" :key="article.art_id"></comment>
    </div>
    <div v-else class="error">
      <p>网络超时，点击 <a href="#" @click.prevent="loadData()">刷新</a> 试一试。</p>
    </div>
  </div>
</template>

<script>
import comment from './components/Comment.vue'
import { getArticle } from '@/api/article'
export default {
  components: { comment },
  data () {
    return {
      loading: true,
      scrollTop: 0,
      article: {}
    }
  },
  activated () {
    // 如果之前浏览过   不会再次加载   且会停留在之前阅读位置  注意：只会记录一篇文章
    if (this.article.art_id !== +this.$route.params.id) {
      this.scrollTop = 0
      this.loadData()
    } else {
      this.$refs.detail.scrollTop = this.scrollTop
    }
  },
  methods: {
    scroll () {
      this.scrollTop = this.$refs.detail.scrollTop
    },
    async loadData () {
      try {
        this.loading = true
        const { data: { data } } = await getArticle(this.$route.params.id)
        this.article = data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.van-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .van-button {
      background-color: #3296fa;
    }
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
