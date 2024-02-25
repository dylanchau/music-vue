import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import { useAuthStore } from '../stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      name: 'manage',
      // alias: '/manage',
      path: '/manage-music',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/ManageView.vue'),
      beforeEnter: (to, from, next) => {
        console.log('Manage Route Guard')
        next()
      }
    },
    {
      path: '/manage',
      redirect: { name: 'manage' }
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' }
    }
  ],
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next()
    return
  }
  const store = useAuthStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
