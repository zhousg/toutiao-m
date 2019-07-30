<template>
  <div class="app-container">
    <my-header></my-header>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer">
      <van-tabbar v-model="active">
        <van-tabbar-item replace :to="{name:'home'}" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace :to="{name:'find'}" icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item replace :to="{name:'video'}" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item replace :to="{name:'user'}" icon="user-circle-o" dot>我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped></style>
