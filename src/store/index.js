import Vuex from 'vuex'
import Vue from 'vue'
import { getMyChannel } from '@/api/channel'
import { getArticle } from '@/api/article'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 我的频道数据
    myChannel: [],
    // 文章详情数据
    article: {}
  },
  mutations: {
    // 修改我的频道数据
    setMyChannel (state, payLoad) {
      state.myChannel = payLoad
    },
    // 修改文章信息
    setArticle (state, payLoad) {
      if (payLoad.scrollTop) {
        state.article.scrollTop = payLoad.scrollTop
      } else {
        state.article = payLoad
      }
    }
  },
  actions: {
    // 获取我的频道数据
    async getMyChannel (context, payLoad) {
      const { data: { data } } = await getMyChannel()
      context.commit('setMyChannel', data.channels)
    },
    // 获取文章详情
    async getArticle (context, id) {
      const { data: { data } } = await getArticle(id)
      context.commit('setArticle', data)
    }
  }
})

export default store
