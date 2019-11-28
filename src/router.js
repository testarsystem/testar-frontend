import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true}
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
      component: () => import('./views/Tests/Tests.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/tests/new',
      name: 'newTest',
      component: () => import('./views/Tests/CreateTest.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/tests/:id/edit',
      component: () => import('./views/Tests/EditTest.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/competitions/:id',
      component: () => import('./views/Competitions/Competition.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/tests/:id/competition',
      component: () => import('./views/Competitions/CreateCompetition.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/my_competitions',
      name: 'myCompetitions',
      component: () => import('./views/Competitions/MyCompetitions.vue'),
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach(async (to, from, next) => {                //перед каждым переходом страницы
  if(!to.matched.some(record => record.meta.requiresAuth))   //если не требуется аутентификация
    return next();                                           //переход на страницу
  const token = localStorage.getItem('token')
  if ( token == null) {                                     //если нет токена в localStorage
    return next({
      path: '/login',                                        //переадресация на страничку 
      query: { redirect: to.fullPath }                      //сохранение адреса назначения
    })
  } 
  return next();
})

export default router;
