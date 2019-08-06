<template>
  <div class="app-header">
    <van-nav-bar right-text="搜索"  @click-right="$router.push('/search')">
      <img src="../assets/images/logo.png" slot="title" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'my-header'
}
</script>

<style scoped lang='less'>
img {
  vertical-align: middle;
}
</style>
