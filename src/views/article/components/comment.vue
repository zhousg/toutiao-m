<template>
  <div class="comment van-hairline--top">
    <div class="item van-hairline--bottom" v-for="item in list" :key="item.com_id">
      <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
      <div class="info">
        <p>
          <span style="color:#069">{{item.aut_name}}</span>
          <span style="float:right">
            <span
              style="vertical-align:middle;padding-right:2px"
              class="van-icon van-icon-good-job-o"
            ></span>
            <span style="vertical-align:middle;font-size:10px">{{item.like_count}}</span>
          </span>
        </p>
        <p>{{item.content}}</p>
        <p>
          <span style="color:#666">{{item.pubdate|formatTime}}</span>&nbsp;
          <van-tag plain @click="openReply(item)">{{item.reply_count}} 回复</van-tag>
        </p>
      </div>
    </div>
    <div style="text-align:center;padding-top:10px">
      <span v-if="noMore">没有更多评论了</span>
      <van-button style="border:none;" v-else @click="more()" :loading="loading" size="small">加载更多</van-button>
    </div>
    <van-action-sheet class="reply_dailog" v-model="reply.open" @close="closeReply()" title="回复评论">
      <div class="comment" style="padding:0 10px;margin:0">
        <div
          class="item van-hairline--bottom"
          v-for="item in reply.list"
          :key="item.com_id.toString()"
        >
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p>
              <span style="color:#069">{{item.aut_name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span style="color:#666">{{item.pubdate|formatTime}}</span>
            </p>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <div class='reply-container van-hairline--top'>
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import { submitComment, getComments } from '@/api/comment'
export default {
  props: ['articleId'],
  data () {
    return {
      value: '',
      commentId: null,
      commentLoading: false,
      offset: null,
      list: [],
      loading: false,
      noMore: false,
      reply: {
        open: false,
        offset: null,
        list: [],
        loading: false,
        noMore: false
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async send () {
      if (!this.value) return false
      try {
        this.commentLoading = true
        await this.$sleep()
        if (this.commentId) {
          const { data: { data } } = await submitComment(this.commentId, this.value, this.articleId)
          this.reply.list.unshift(data.new_obj)
          const item = this.list.find(item => item.com_id === this.commentId)
          item.reply_count++
        } else {
          const { data: { data } } = await submitComment(this.articleId, this.value)
          this.list.unshift(data.new_obj)
        }
        this.value = ''
      } finally {
        this.commentLoading = false
      }
    },
    async getData () {
      this.loading = true
      await this.$sleep()
      const {
        data: { data }
      } = await getComments(this.articleId, 'a', this.offset)
      this.list.push(...data.results)
      this.offset = data.last_id
      this.loading = false
      this.noMore = data.results.length < 10
    },
    async getReplys (comId) {
      this.reply.loading = true
      const {
        data: { data }
      } = await getComments(comId, 'c', this.reply.offset)
      this.reply.list.push(...data.results)
      this.reply.offset = data.last_id
      this.reply.noMore = data.results.length < 10
      this.reply.loading = false
    },
    more () {
      this.getData()
    },
    openReply (item) {
      this.reply.open = true
      this.reply.list = []
      this.getReplys(item.com_id)
      // 清除评论
      this.value = ''
      this.commentId = item.com_id
    },
    closeReply () {
      // 清除评论
      this.value = ''
      this.commentId = null
      this.reply.offset = null
    }
  }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 10px;
  .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply_dailog {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.reply-container{
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
.vant-toast{
  z-index: 10000;
}
</style>
