import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Account/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Account/Register.vue')
    },
    {
      path: '/tests',
      name: 'tests',
      component: () => import('./views/Tests/Tests.vue')
    },
    {
      path: '/tests/new',
      name: 'newTest',
      component: () => import('./views/Tests/CreateTest.vue')
    },
    {
      path: '/tests/:id',
      component: () => import('./views/Tests/Test.vue')
    }
  ]
})
