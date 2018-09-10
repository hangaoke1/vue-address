import XAddress from './x-address.vue' // 导入组件
const option = {
  install (Vue, options) {
    Vue.component(XAddress.name, XAddress)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XAddress)
}
export default option
