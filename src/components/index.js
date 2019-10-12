import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
import MyCover from '@/components/my-cover.vue'

export default {
  // 将组件定义成插件
  install (Vue) {
    // 注册全局组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyCover.name, MyCover)
  }
}
