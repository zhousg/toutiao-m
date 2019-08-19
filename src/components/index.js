import MyTag from './my-tag'
const components = [MyTag]
export default {
  install (Vue) {
    components.forEach(item => Vue.component(item.name, item))
  }
}
