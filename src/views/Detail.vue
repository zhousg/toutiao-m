<template>
  <div class='container'>
    <van-nav-bar left-text="返回"  @click-left="$router.back()" title="文章详情"></van-nav-bar>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  activated () {
    this.toggleTabBar(false)
  },
  methods: {
    ...mapMutations(['toggleTabBar'])
  }
}
</script>

<style scoped lang='less'></style>
