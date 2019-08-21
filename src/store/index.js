import Vuex from 'vuex'
import Vue from 'vue'
import { userLocal } from '@/utils/local'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: userLocal.getUser()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      userLocal.setUser(user)
    },
    removeUser (state) {
      state.user = null
      userLocal.removeUser()
    }
  }
})

export default store
