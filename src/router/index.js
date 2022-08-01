import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const route = [
  {
    path: '/',
    name: 'service',
    component: {
      render(c) { return c('router-view') }
    },
    redirect: '/home/musicList',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
    children: [
      {
        path: 'musicList',
        name: 'musicList',
        component: () => import(/* webpackChunkName: "musicList" */ '@/pages/musicList')
      },
    ]
  },
  /*{
    path: '/previewPage',
    name: 'previewPage',
    component: () => import('@/pages/serviceManage/previewPage')
  }*/
]

export default new Router({
  routes: route
})
