<template>
  <div class="app-container">
    <van-nav-bar v-if="$route.path!=='/user'" right-text="搜索" @click-right="$router.push('/search')" @click-left="$router.back()" title="黑马头条"></van-nav-bar>
    <div class="app-content">
      <router-view></router-view>
    </div>
    <div class="app-footer">
      <van-tabbar v-model="active">
        <van-tabbar-item name="/home" replace :to="{name:'home'}" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="/find" replace :to="{name:'find'}" icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item name="/video" replace :to="{name:'video'}" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item name="/user" replace :to="{name:'user'}" icon="user-circle-o" dot>我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: this.$route.path
    }
  },
  activated () {
    this.active = this.$route.path
  }
}
</script>

<style scoped></style>
