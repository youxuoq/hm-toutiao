import MyBread from '@/components/my-bread.vue'

export default {
  // 将组件定义成插件
  install (Vue) {
    // 注册全局组件
    Vue.component(MyBread.name, MyBread)
  }
}
