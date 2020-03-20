import Vue from 'vue'
import Routerr from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Routerr)

const router = new Routerr({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  }]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!sessionStorage.userkey

  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})


export default router
