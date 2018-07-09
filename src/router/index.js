import Vue from 'vue'
import Router from 'vue-router'
import guide from '@/components/guide'
import register from '@/components/register'
import registerResult from '@/components/registerResult'
import wxShareTest from '@/components/wxShareTest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'present-guide',
      component: guide
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/registerResult',
      name: 'registerResult',
      component: registerResult
    },
    { 
      path: '/present',
      redirect: '/'

    },
    { 
      path: '/wxShareTest',
      name: 'present-wxShareTest',
      component: wxShareTest

    }
  ]
})
