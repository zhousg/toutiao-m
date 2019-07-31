import request from '@/utils/request'
import axios from 'axios'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 */
export const login = (mobile, code) => {
  return request.post('authorizations', { mobile, code })
}
/**
 * 刷新token
 * @param {String} refreshToken 刷新的token
 */
export const refreshToken = (refreshToken) => {
  return axios({
    method: 'put',
    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    headers: {
      Authorization: 'Bearer ' + refreshToken
    }
  })
}
