<template>
  <div class="container">
    <van-nav-bar left-text="返回" @click-left="$router.back()" title="搜索中心"></van-nav-bar>
    <van-search v-model="q" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="search-history">
      <div class="title">历史搜索记录：</div>
      <div class="content van-hairline--top">
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <div class="item van-hairline--bottom">js优化</div>
        <van-button style="padding:0 5px;color:#777;" size="mini" plain icon="delete">清空历史记录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      q: ''
    }
  },
  methods: {
    onSearch () {}
  }
}
</script>

<style scoped lang='less'>
.van-col {
  padding: 10px;
  position: relative;
}
</style>
