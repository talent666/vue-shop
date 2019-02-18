import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/welcome'
import user from '@/components/user'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/welcome',
      children:[
        {path:'/welcome',component:welcome},
        {path:'/users', component:user}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (!window.sessionStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
