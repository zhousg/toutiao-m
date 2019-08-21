<template>
  <div class="wrapper">
    <van-nav-bar left-text="首页" @click-left="$router.push('/home')" title="黑马头条"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="mobile" required label="手机号" placeholder="请输入手机号" />
      <van-field v-model="code" required label="验证码" placeholder="请输入验证码" />
    </van-cell-group>
    <div class="box">
      <van-button type="info" block @click="login()" size="small">登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      mobile: '13911111111',
      code: '246810'
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async login () {
      const {
        data: { data }
      } = await login(this.mobile, this.code)
      // 存储token
      this.setUser(data)
      if (this.$route.query.returnUrl) {
        this.$router.replace(this.$route.query.returnUrl)
      } else {
        // 跳转首页
        this.$router.replace('/user')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .van-button {
    height: 34px;
  }
}
</style>
