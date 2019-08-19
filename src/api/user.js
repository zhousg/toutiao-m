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

/**
 *  获取用户信息
 */
export const getUserInfo = () => {
  return request.get('user')
}

/**
 *  获取用户资料
 */
export const getUserProfile = () => {
  return request.get('user/profile')
}
/**
 *  编辑用户资料
 *  @param {String} name - 昵称
 *  @param {String} photo - 头像 base64编码处理  （接口问题？？？）
 *  @param {Integer} gender - 性别，0-男，1-女
 *  @param {String} birthday - 生日，格式'2018-12-20'
 */
export const editUser = (user) => {
  return request.patch('user/profile', user)
}
