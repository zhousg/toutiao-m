import Vuex from 'vuex'
import Vue from 'vue'
import { getMyChannel } from '@/api/channel'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 底部tabbar显示隐藏
    tabBarVisible: true,
    // 我的频道数据
    myChannel: []
  },
  mutations: {
    // tabbar显示隐藏
    toggleTabBar (state, payLoad) {
      state.tabBarVisible = payLoad
    },
    // 修改我的频道数据
    setMyChannel (state, payLoad) {
      state.myChannel = payLoad
    }
  },
  actions: {
    // 获取我的频道数据
    async getMyChannel (context, payLoad) {
      const { data: { data } } = await getMyChannel()
      context.commit('setMyChannel', data.channels)
    }
  }
})

export default store
