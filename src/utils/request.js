// 请求工具
import axios from 'axios'
import bigInt from 'json-bigint'
import router from '@/router'
import { userLocal } from '@/utils/local'
import { refreshToken } from '@/api/user'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  // timeout: 10000,
  transformResponse: [data => {
    try {
      return bigInt({ 'storeAsString': true }).parse(data)
    } catch (err) {
      return data
    }
  }]
})

instance.interceptors.request.use(config => {
  const user = userLocal.getUser()
  if (user.token) config.headers.Authorization = 'Bearer ' + user.token
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res
}, async err => {
  if (err.response && err.response.status === 401) {
    // token失效
    const user = userLocal.getUser()
    if (user.refresh_token) {
      // 更新token
      try {
        const { data: { data } } = await refreshToken(user.refresh_token)
        userLocal.setUser(data)
        // 去继续请求失败接口
        return instance(err.config)
      } catch (e) {
        // 去登录页
        return router.push('/login?returnUrl=' + router.currentRoute.path)
      }
    } else {
      // 去登录页
      return router.push('/login?returnUrl=' + router.currentRoute.path)
    }
  }
  return Promise.reject(err)
})

export default instance
