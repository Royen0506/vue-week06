import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../views/UserHome.vue')
        },
        {
          path: '/UserCart',
          component: () => import('../views/UserCart.vue')
        },
        {
          path: '/UserProducts',
          component: () => import('../views/UserProducts.vue')
        },
        {
          path: '/UserProducts/:id',
          component: () => import('../views/UserProductDetails.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/AdminOrder.vue')
        }
      ]
    }
  ]
})

export default router
