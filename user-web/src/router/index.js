import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'disabled active',
  routes: [
    {
      path: '',
      name: 'user',
      component: () => import('@/components/Users/Index'),
      meta: {
        middleware: 'auth'
      }
    },
    {
      path: '/edit',
      name: 'user.edit',
      component: () => import('@/components/Users/Edit'),
      meta: {
        middleware: 'auth'
      }
    },
    {
      path: '/register',
      name: 'user.create',
      component: () => import('@/components/Users/Create'),
      meta: {
        middleware: 'guest'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login'),
      meta: {
        middleware: 'guest'
      }
    },
    {
      path: '*',
      component: () => import('@/components/NotFound'),
      meta: {
        middleware: 'guest'
      }
    }
  ]
})
