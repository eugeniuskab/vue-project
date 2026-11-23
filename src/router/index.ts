import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ServersView from '@/views/ServersView.vue'
import AlertsView from '@/views/AlertsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/servers',
      name: 'servers',
      component: ServersView
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertsView
    }
  ]
})

export default router