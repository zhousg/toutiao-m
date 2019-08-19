<template>
  <div class="app-container">
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer" v-show="$store.state.tabBarVisible">
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
