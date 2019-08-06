<template>
  <div class="wrapper">
    <my-header></my-header>
    <van-cell-group>
      <van-field v-model="mobile" required label="手机号" placeholder="请输入手机号" />
      <van-field
        v-model="code"
        required
        :type="eyeClosed?'password':'text'"
        label="验证码"
        placeholder="请输入验证码"
        :right-icon="eyeClosed?'closed-eye':'eye-o'"
        @click-right-icon="eyeClosed=!eyeClosed"
      />
    </van-cell-group>
    <div class="box">
      <van-button type="info" block @click="login()" size="small">登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { userLocal } from '@/utils/local'
export default {
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      eyeClosed: true
    }
  },
  methods: {
    async login () {
      const { data: { data } } = await login(this.mobile, this.code)
      // 存储token
      userLocal.setUser(data)
      // 跳转首页
      this.$router.replace('/home')
    }
  }
}
</script>

<style scoped lang='less'>
.box{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
