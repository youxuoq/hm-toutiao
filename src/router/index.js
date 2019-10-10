import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/index'
import Home from '@/views/Home/index'
import HomeMain from '@/views/Home/main.vue'
import Article from '@/views/article/index'
import MyComment from '@/views/comment/index'
import Material from '@/views/material/index'
import Publish from '@/views/publish/index'
import Fans from '@/views/fans/index'
import Setting from '@/views/setting/index'
import MyError from '@/views/404/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'home', path: '/', component: HomeMain },
        { name: 'article', path: '/article', component: Article },
        { name: 'comment', path: '/comment', component: MyComment },
        { name: 'material', path: '/material', component: Material },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'fans', path: '/fans', component: Fans },
        { name: 'setting', path: '/setting', component: Setting }

      ] },
    { name: 'error', path: '*', component: MyError }
  ]
})
router.beforeEach((to, from, next) => {
  const TOKEN = window.sessionStorage.getItem('TOKEN')
  if (to.path !== '/login' && !TOKEN) {
    return next('/login')
  } else {
    return next()
  }
})

export default router
