import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import Home from './views/Home/Home.vue'

const Press = () => import('./views/Press/Press.vue')

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/press/:id',
    component: Press,
    props: true,
    name: 'press',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})

export default router

export const homeRoute = SiteRoutes[0]
export const headerRoutes = [
  homeRoute,
  {
    name: 'press',
    params: {
      id: 'brand',
    },
  },
]
