import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '@/views/AboutUs.vue'
import FAQ from '@/views/FAQ.vue'
import MarketView from '@/views/MarketView.vue'
import LogIn from '@/views/LogIn.vue'
import Currency from '@/views/Currency.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs,
    },
    {
      path: '/currency',
      name: 'currency',
      component: () => import('../views/Currency.vue'),
    },
    {
      path: '/market',
      name: 'market',
      component: MarketView,
    },
    {
      path: '/',
      name: 'logIn',
      component: LogIn,
    }
    /*{
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },*/
  ],
})

export default router
