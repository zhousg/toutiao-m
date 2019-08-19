<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="搜索中心"></van-nav-bar>
    <van-search v-model="q" placeholder="请输入搜索关键词" shape="round" @search="toSeach()"></van-search>
    <div class="search-history" v-if="historyList.length && !q">
      <div class="title">历史搜索记录：</div>
      <div class="content van-hairline--top">
        <div
          @click="toSeach(item)"
          class="item van-hairline--bottom"
          v-for="item in historyList"
          :key="item"
        >
          {{item}}
          <van-icon @click.stop="remove(item)" name="close" style="float:right;line-height:35px"></van-icon>
        </div>
        <van-button
          @click="clear()"
          style="padding:0 8px;border:none"
          size="mini"
          plain
          icon="delete"
        >清空历史记录</van-button>
      </div>
    </div>
    <van-cell-group v-else>
      <van-cell
        v-for="item in suggestion"
        :key="item"
        :title="item"
        @click="toSeach(item)"
        style="padding-left:40px"
      >
        <van-icon slot="right-icon" name="search" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchLocal } from '@/utils/local';
import { getSuggestion } from '@/api/article';
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      q: '',
      historyList: searchLocal.getHistory(),
      timer: null,
      suggestion: []
    }
  },
  activated () {
    this.q = '';
    this.historyList = searchLocal.getHistory()
  },
  watch: {
    q (nowVal, oldVal) {
      if (!nowVal.trim()) return false
      window.clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 用户停止输入后 200ms 联想查询
        const {
          data: { data }
        } = await getSuggestion(this.q)
        this.suggestion = data.options
      }, 200)
    }
  },
  methods: {
    toSeach (text) {
      if (text) {
        // 历史搜索 或者 提示搜索
        this.$router.push({ path: '/result', query: { q: text } })
      } else {
        // 输入搜索
        if (!this.q.trim()) return false
        searchLocal.setHistory(this.q.trim())
        this.$router.push({ path: '/result', query: { q: this.q.trim() } })
      }
    },
    clear () {
      searchLocal.clearHistory()
      this.historyList = searchLocal.getHistory()
    },
    remove (text) {
      searchLocal.removeHistory(text)
      this.historyList = searchLocal.getHistory()
    }
  }
}
</script>

<style scoped lang='less'>
.van-col {
  padding: 10px;
  position: relative;
}
</style>
