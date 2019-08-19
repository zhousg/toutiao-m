import Vue from 'vue'
import VueRouter from 'vue-router'
import { userLocal } from '@/utils/local'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import Home from '@/views/Home.vue'
import Video from '@/views/Video.vue'
import Find from '@/views/Find.vue'
import Detail from '@/views/article/Index.vue'
import Search from '@/views/search/Index.vue'
import SearchResult from '@/views/search/Result.vue'
import User from '@/views/users/Index.vue'
import Profile from '@/views/users/Profile.vue'
import Chat from '@/views/users/Chat.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'welcome', path: '/', redirect: '/home' },
    { name: 'search', path: '/search', component: Search },
    { name: 'result', path: '/result', component: SearchResult },
    { name: 'detail', path: '/detail/:id', component: Detail, meta: { keepAlive: true } },
    { name: 'user-profile', path: '/user/profile', component: Profile },
    { name: 'user-chat', path: '/user/chat', component: Chat },
    {
      path: '/home',
      component: Layout,
      children: [
        { name: 'home', path: '/home', component: Home, meta: { keepAlive: true } },
        { name: 'video', path: '/video', component: Video },
        { name: 'find', path: '/find', component: Find },
        { name: 'user', path: '/user', component: User }
      ]
    }
  ]
})

const loginPath = ['/user', '/user/profile', '/user/chat']
router.beforeEach((to, from, next) => {
  // 如果未登录 且跳转路径不是 /login  重定向到login
  if (loginPath.includes(to.path) && !userLocal.getUser().token) return next('/login')
  next()
})

export default router
