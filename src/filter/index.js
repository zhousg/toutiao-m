import moment from 'moment'
// 格式化日期 2018-10-10 20:20:20
const formatTime = (value) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}
// 计算距离当前时间返回字符串 刚刚 xx分钟前 xx小时前 xx天前
const calcTime = (value) => {
  const time = new Date(value)
  const now = Date.now()
  // 计算时间毫秒差
  const calc = now - time
  let str = ''
  if (calc < 60 * 60 * 1000) {
    const m = Math.floor(calc / (60 * 1000))
    str = m > 0 ? m + '分钟前' : '刚刚发布'
  } else if (calc < 24 * 60 * 60 * 1000) {
    const h = Math.floor(calc / (60 * 60 * 1000))
    str = h + '小时前'
  } else {
    const d = Math.floor(calc / (24 * 60 * 60 * 1000))
    str = d + '天前'
  }
  return str
}
export default {
  install (Vue) {
    // 注册全局过滤器
    Vue.filter('formatTime', formatTime)
    Vue.filter('calcTime', calcTime)
  }
}
