import request from '@/utils/request'
/**
 * 获取文章列表信息
 * @param {Object} data - 参数对象 包含channel_id，timestamp，with_top
 */
export const getArticles = data => {
  return request.get('http://ttapi.research.itcast.cn/app/v1_1/articles', { params: data })
}

/**
 * 获取文章详情
 * @param {Number} id - 文章ID
 */
export const getArticle = id => {
  return request.get(`articles/${id}`)
}
