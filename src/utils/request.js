// 请求工具
import axios from 'axios'
import bigInt from 'json-bigint'
import { userLocal } from '@/utils/local'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [data => {
    try {
      return bigInt.parse(data)
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

export default instance
