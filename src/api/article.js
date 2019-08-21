import request from '@/utils/request'
/**
 * 获取文章列表信息
 * @param {Object} data - 参数对象 包含channel_id，timestamp，with_top
 */
export const getArticles = data => {
  data.with_top = 1
  return request.get('http://ttapi.research.itcast.cn/app/v1_1/articles', { params: data })
}

/**
 * 获取文章详情
 * @param {Number} id - 文章ID
 */
export const getArticle = id => {
  return request.get(`articles/${id}`)
}

/**
 * 获取联想建议
 * @param {Number} q - 搜索关键字
 */
export const getSuggestion = (q) => {
  return request.get('suggestion', { params: { q } })
}

/**
 * 获取搜索结果
 * @param {*} params 查询参数对象 page 当前页 per_page 一页多少条 q 搜索关键字
 */
export const getSearchResult = (params) => {
  return request.get('search', { params })
}
