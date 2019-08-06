import Vue from 'vue'
import VueRouter from 'vue-router'
import { userLocal } from '@/utils/local'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import Home from '@/views/Home.vue'
import Video from '@/views/Video.vue'
import Find from '@/views/Find.vue'
import Detail from '@/views/Detail.vue'
import Search from '@/views/Search.vue'
import SearchResult from '@/views/Search-Result.vue'
import User from '@/views/users/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'welcome', path: '/', redirect: '/home' },
    { name: 'search', path: '/search', component: Search },
    { name: 'result', path: '/result', component: SearchResult },
    {
      path: '/home',
      component: Layout,
      children: [
        { name: 'home', path: '/home', component: Home },
        { name: 'detail', path: '/detail', component: Detail },
        { name: 'video', path: '/video', component: Video },
        { name: 'find', path: '/find', component: Find },
        { name: 'user', path: '/user', component: User }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果未登录 且跳转路径不是 /login  重定向到login
  if (to.path !== '/login' && !userLocal.getUser().token) return next('/login')
  next()
})

export default router
