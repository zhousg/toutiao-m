import MyHeader from './my-header'
import MyTag from './my-tag'
const components = [MyHeader, MyTag]
export default {
  install (Vue) {
    components.forEach(item => Vue.component(item.name, item))
  }
}
