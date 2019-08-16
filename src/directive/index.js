export default {
  install (Vue) {
    // 指令注册
    Vue.directive('scroll', {
      inserted (el, binding) {
        el.scrollTop = binding.value
      }
    })
  }
}
