<template>
  <div class="page-user-profile">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <van-field label="头像" center>
        <van-image
          @click="show=true"
          slot="input"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-field>
      <van-field label="名称" v-model="userInfo.name" />
      <van-field label="介绍" type="textarea" rows="5" v-model="userInfo.intro" />
      <van-field label="手机号" v-model="userInfo.mobile" />
      <van-field label="邮箱" v-model="userInfo.email" />
    </van-cell-group>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        id: 1,
        photo: 'https://img.yzcdn.cn/vant/cat.jpeg',
        name: '测试帐号',
        intro:
          '这里是描述，很多歌文字，非常大大，啊啊啊很多多大，啊啊啊很多多大，啊啊啊很多多。',
        mobile: '13200000000',
        email: 'zhoushugang@itcast.cn'
      },
      show: false,
      actions: [
        { name: '从相册选择' },
        { name: '拍照' }
      ]
    }
  },
  methods: {
    onSelect (item) {
      this.show = false
      this.$toast(item.name)
    }
  }
}
</script>

<style scoped lang='less'>
.page-user-profile /deep/ .van-field__control {
  color: #999;
}
</style>
