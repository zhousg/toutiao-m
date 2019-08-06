<template>
  <div class="bar_btn" v-if="!open" @click="openSheet()">
    <van-icon name="wap-nav" />
  </div>
  <van-action-sheet class="bar_box" v-else v-model="open" title="编辑频道">
    <div class="item">
      <p>我的频道：</p>
      <van-button
        @click="del(item.id)"
        :key="item.id"
        v-for="item in myChannel"
        icon="close"
        size="small"
        type="default"
      >{{item.name}}</van-button>
    </div>
    <div class="item">
      <p>推荐频道：</p>
      <van-button
        @click="add(item.id,index)"
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
import { mapState, mapActions } from 'vuex'
import { getAllChannel, addMyChannel, delMyChannel } from '@/api/channel'
export default {
  name: 'my-tag',
  data () {
    return {
      open: false,
      allChannel: []
    }
  },
  computed: {
    ...mapState(['myChannel']),
    recommendChannel () {
      return this.allChannel.filter(allItem => {
        if (!this.myChannel.find(myItem => allItem.id === myItem.id)) return allItem
      })
    }
  },
  methods: {
    ...mapActions(['getMyChannel']),
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
      this.getMyChannel()
    },
    async add (id, index) {
      await addMyChannel({ id, seq: this.myChannel.length + 1 })
      this.getMyChannel()
    }
  }
}
</script>

<style scoped lang="less">
.van-action-sheet__header {
  background: #3296fa;
  color: #fff;
  .van-icon-close {
    color: #fff;
  }
}
.bar_btn {
  width: 30px;
  height: 29px;
  position: absolute;
  top: 46px;
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
