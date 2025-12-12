import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/services'
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/royalty-splits',
      name: 'royalty-splits',
      component: () => import('../views/RoyaltySplitsView.vue')
    }
  ]
})

export default router
