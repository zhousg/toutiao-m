// 提供vue一些工具函数
const $sleep = (time) => {
  let sleepTime = time || 1000
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, sleepTime)
  })
}

export default {
  install (Vue) {
    Vue.prototype.$sleep = $sleep
  }
}
