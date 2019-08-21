<template>
  <div class="bar_btn" v-if="!open" @click="openSheet()">
    <van-icon name="wap-nav" />
  </div>
  <van-action-sheet class="bar_box" v-else v-model="open" title="编辑频道">
    <div class="item">
      <p>我的频道：<span class="go-text">登录后才可编辑</span></p>
      <van-button
        @click="del(item.id)"
        :key="item.id"
        v-for="item in channels"
        icon="close"
        size="small"
        type="default"
        :style="item.id===value?{color:'red'}:null"
      >{{item.name}}</van-button>
    </div>
    <div class="item">
      <p>推荐频道：</p>
      <van-button
        @click="add(item,index)"
        :key="item.id"
        v-for="(item,index) in recommendChannel"
        icon="add-o"
        size="small"
        type="default"
      >{{item.name}}</van-button>
    </div>
    <br />
  </van-action-sheet>
</template>

<script>
import { getAllChannel, addMyChannel, delMyChannel } from '@/api/channel'
export default {
  name: 'my-tag',
  props: ['channels', 'value'],
  data () {
    return {
      open: false,
      allChannel: []
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannel.filter(allItem => {
        if (!this.channels.find(myItem => allItem.id === myItem.id)) return allItem
      })
    }
  },
  methods: {
    openSheet () {
      this.open = true
      this.getAllChannel()
    },
    async getAllChannel () {
      const {
        data: { data }
      } = await getAllChannel()
      this.allChannel = data.channels
    },
    async del (id) {
      await delMyChannel(id)
      this.channels.splice(this.channels.findIndex(item => item.id === id), 1)
      // 修改父组件数据
      this.$emit('update', this.channels)
      // 如果是删除激活的频道  回到推荐频道
      this.$emit('input', 0)
    },
    async add (item, index) {
      // 其实是修改 保证后端排序和前端序号一致
      const items = this.channels.map((item, i) => ({ id: item.id, seq: i + 1 }))
      items.push({ id: item.id, seq: items.length + 1 })
      // 删除推荐
      items.splice(0, 1)
      // 修改请求
      await addMyChannel(items)
      // 修改父组件数据
      this.channels.push({
        id: item.id,
        name: item.name,
        articles: [],
        upLoading: false,
        finished: false,
        downLoading: false,
        timestamp: Date.now(),
        scrollTop: 0
      })
      // 修改父组件数据
      this.$emit('update', this.channels)
    }
  }
}
</script>

<style scoped lang="less">
.go-text{
  font-size: 8px;
  color: #666;
}
.van-action-sheet__header {
  background: #3296fa;
  color: #fff;
  .van-icon-close {
    color: #fff;
  }
}
.bar_btn {
  width: 32px;
  height: 31px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 29px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 16px;
    }
  }
}
.bar_box {
  max-height: 100%;
  height: 100%;
  .item {
    padding: 0 10px;
    .van-button {
      margin-right: 10px;
    }
  }
}
.van-button {
  margin-bottom: 10px;
}
</style>
