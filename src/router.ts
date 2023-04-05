import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import Home from './views/Home/Home.vue'

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})

export default router
