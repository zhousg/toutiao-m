<template>
  <div class="wrapper">
    <van-tabs v-model="reqParams.channel_id" @change="changeTab" swipeable>
      <van-tab :key="item.id" v-for="item in myChannel" :title="item.name" :name="item.id"></van-tab>
    </van-tabs>
    <channel></channel>
    <div class="scroll-wrapper" ref="wrapper" @scroll="scroll()">
      <van-pull-refresh v-model="downLoading" @refresh="onRefresh">
        <van-list
          ref="list"
          v-model="upLoading"
          :offset="100"
          :immediate-check="false"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.art_id.toString()" @click="$router.push('/detail/'+item.art_id)">
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
      </van-pull-refresh>
      <van-icon name="upgrade" @click="top()"></van-icon>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getArticles } from '@/api/article'
import Channel from './components/Channel'
export default {
  components: { Channel },
  data () {
    return {
      reqParams: {
        channel_id: 0,
        timestamp: Date.now(),
        with_top: 1
      },
      list: [],
      upLoading: false,
      finished: false,
      downLoading: false,
      scrollTop: 0
    }
  },
  computed: {
    ...mapState(['myChannel'])
  },
  watch: {
    myChannel () {
      this.reqParams.channel_id = 0
      this.$refs.list.check()
    }
  },
  created () {
    this.getMyChannel()
  },
  // 激活后钩子
  activated () {
    // 还原大容器 卷曲的高度
    this.$refs.wrapper.scrollTop = this.scrollTop
  },
  methods: {
    ...mapActions(['getMyChannel']),
    scroll () {
      // 滚动时候监听  卷曲的高度
      this.scrollTop = this.$refs.wrapper.scrollTop
    },
    top () {
      if (this.$refs.wrapper) {
        // 简易向上滚动 300ms 动画
        const step = Math.ceil(this.scrollTop / 30)
        const timer = window.setInterval(() => {
          this.scrollTop -= step
          if (this.scrollTop < 0) {
            window.clearInterval(timer)
            this.scrollTop = 0
          }
          this.$refs.wrapper.scrollTop = this.scrollTop
        }, 10)
      }
    },
    changeTab (name) {
      this.reqParams.channel_id = name
      this.list = []
      // 检查是否最底部  需要等列表渲染完毕去检查, 否则不成功
      this.$nextTick(() => {
        this.$refs.list.check()
      })
    },
    async onLoad () {
      await this.$sleep()
      const data = await this.getArticles()
      // 追加数据
      this.list.push(...data.results)
      // 加载状态结束
      this.upLoading = false
      // 修改无数据状态
      if (data.results.length < 10) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.reqParams.timestamp = Date.now()
      // 修改有数据状态
      this.finished = false
      await this.$sleep()
      const data = await this.getArticles()
      // 更新数据结束
      this.downLoading = false
      // 更新数据
      this.list = data.results
      // 检查是否最底部  需要等列表渲染完毕去检查, 否则不成功
      this.$nextTick(() => {
        this.$refs.list.check()
      })
    },
    async getArticles () {
      const {
        data: { data }
      } = await getArticles(this.reqParams)
      this.reqParams.timestamp = data.pre_timestamp
      return data
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.van-icon {
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 80px;
  font-size: 30px;
  color: #fff;
  text-shadow: 0 0 2px #000;
}
.van-tabs{
  padding-right: 30px;
}
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