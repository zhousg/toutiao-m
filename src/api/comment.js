import request from '@/utils/request'
/**
 * 获取评论列表（文章评论，评论回复）
 * @param {Integer} id - 文章ID 或者 评论ID
 * @param {String} type - a 文章评论 c 评论回复
 * @param {Integer} offset - 评论列表或者回复列表的最后数据ID  不传默认从第一条获取
 */
export const getComments = (id, type, offset) => {
  return request.get(`comments`, { params: { source: id, type, offset } })
}

/**
 *
 * @param {Integer} target - 评论或者回复  对象的ID
 * @param {String} content - 内容
 * @param {Integer} artId - 文章ID  回复时候必须
 */
export const submitComment = (target, content, artId) => {
  return request.post(`comments`, { target, content, art_id: artId })
}
