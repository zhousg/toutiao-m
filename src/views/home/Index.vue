<template>
  <div class="home-wrapper">
    <van-tabs :lazy-render="false" v-model="activeId" @change="changeChannel()" swipeable>
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :name="item.id"
        :title="item.name"
      >
        <div class="scroll-wrapper" ref="scroll-wrapper"  @scroll="scroll">
          <van-pull-refresh
            :success-text="refreshSuccessText"
            v-model="item.downLoading"
            @refresh="onRefresh()"
          >
            <van-list
              v-model="item.upLoading"
              :finished="item.finished"
              :immediate-check="true"
              finished-text="没有更多了"
              :offset="100"
              @load="onLoad(item.id)"
            >
              <van-cell v-for="art in item.articles" :key="art.art_id" :title="art.title" />
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <channel :channels.sync="channels" v-model="activeId"></channel>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannel } from '@/api/channel'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
import Channel from './components/Channel'
export default {
  components: { Channel },
  data () {
    return {
      // 频道数据
      channels: [],
      // 默认 0 是推荐频道
      activeId: 0,
      // 刷新成功的提示语
      refreshSuccessText: null
    }
  },
  computed: {
    // 当前频道索引
    activeIndex () {
      const index = this.channels.findIndex(item => item.id === this.activeId)
      return index < 0 ? 0 : index
    },
    // 当前频道数据
    activeChannel () {
      return this.channels.find(item => item.id === this.activeId)
    },
    ...mapState(['user'])
  },
  watch: {
    user () {
      this.getChannels()
      this.onLoad()
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    // 获取推荐频道文章数据
    // this.onLoad()
  },
  activated () {
    // 排除 created 触发的第一次激活  无dom问题
    if (this.$refs['scroll-wrapper']) {
      this.$refs['scroll-wrapper'][this.activeIndex].scrollTop = this.activeChannel.scrollTop
    }
  },
  methods: {
    changeChannel () {
      if (!this.activeChannel.articles.length) {
        this.activeChannel.upLoading = true
        this.onLoad()
      } else {
        // 等列表dom稳定后（tab组件默认跳到srollTop的0位置）  设置定位
        this.$nextTick(() => {
          this.$refs['scroll-wrapper'][this.activeIndex].scrollTop = this.activeChannel.scrollTop
        })
      }
    },
    scroll () {
      this.activeChannel.scrollTop = this.$refs['scroll-wrapper'][this.activeIndex].scrollTop
    },
    async onRefresh () {
      await this.$sleep()
      this.activeChannel.timestamp = Date.now()
      // 异步更新数据
      const data = await this.getArticles()
      if (data.results.length) {
        this.activeChannel.articles = data.results
        this.activeChannel.timestamp = data.pre_timestamp
        this.refreshSuccessText = '更新成功'
        this.onLoad()
      } else {
        this.refreshSuccessText = '暂无更新'
      }
      this.activeChannel.downLoading = false
    },
    async onLoad (channelId) {
      await this.$sleep()
      // 异步更新数据
      const data = await this.getArticles()
      this.activeChannel.articles.push(...data.results)
      // 加载状态结束
      this.activeChannel.upLoading = false
      // 数据全部加载完成
      if (!data.pre_timestamp) {
        this.activeChannel.finished = true
      } else {
        this.activeChannel.timestamp = data.pre_timestamp
      }
    },
    async getChannels () {
      const {
        data: { data }
      } = await getMyChannel()
      const channels = data.channels.map(item => ({
        id: item.id,
        name: item.name,
        articles: [],
        upLoading: false,
        finished: false,
        downLoading: false,
        timestamp: Date.now(),
        scrollTop: 0
      }))
      // 更新频道数据
      this.channels = channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await getArticles({
        channel_id: this.activeId,
        timestamp: this.activeChannel.timestamp
      })
      return data
    }
  }
}
</script>

<style scoped lang='less'>
.home-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  /* 注意：有下拉加载效果需要基于滚动条 */
.van-tabs{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
     /deep/ .van-tabs__wrap{
       padding-right: 32px;
     }
    /deep/ .van-tabs__wrap{
      height: 32px;
    }
    /deep/ .van-tabs__content{
      flex: 1;
      overflow: hidden;
    }
    /deep/ .van-tab__pane{
      height: 100%;
      overflow: hidden;
      .scroll-wrapper{
        height: 100%;
        overflow-y: auto
      }
    }
  }
}
</style>
