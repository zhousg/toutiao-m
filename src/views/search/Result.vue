<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="搜索结果"></van-nav-bar>
    <van-list
      ref="list"
      v-model="loading"
      :error.sync="error"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      style="padding-top:46px"
    >
      <van-cell v-for="item in list" :key="item.art_id" @click="$router.push('/detail/'+item.art_id)">
        <p class="title van-ellipsis">{{item.title}}</p>
            <van-image
              :width="item.cover.type === 1 ? '100%' : '33.3333%'"
              fit="cover"
              v-for="(imgUrl,i) in item.cover.images"
              :key="i"
              :src="imgUrl"
              lazy-load
            />
            <p class="footer">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate|calcTime}}</span>
            </p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/article'
export default {
  data () {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      repParams: {
        q: this.$route.query.q,
        page: 1,
        per_page: 20
      }
    }
  },
  methods: {
    onLoad () {
      getSearchResult(this.repParams).then(res => {
        this.list.push(...res.data.data.results)
        this.loading = false
        this.repParams.page++
        if (!res.data.data.results.length) {
          this.finished = true
        }
      }).catch(() => {
        this.error = true
      })
    }
  }
}
</script>

<style scoped lang='less'>
.van-cell {
  padding: 10px;
  .van-image {
    height: 100px;
  }
  p {
    margin: 0;
    &.title {
      font-size: 16px;
      color: #555;
    }
    &.footer {
      font-size: 12px;
      color: #ccc;
      span{
        padding-right: 10px;
      }
    }
  }
}
</style>
