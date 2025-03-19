import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '@/views/AboutUs.vue'
import FAQ from '@/views/FAQ.vue'
import MarketView from '@/views/MarketView.vue'
import LogIn from '@/views/LogIn.vue'
import Currency from '@/views/Currency.vue'
import { isLoggedIn } from '@/RESTjs/REST'
import MyArticlesView from '@/views/MyArticlesView.vue'
import AddArticleView from '@/views/AddArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
      meta: { requiresAuth: true},
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
      meta: { requiresAuth: true},
    },
    {
      path: '/currency',
      name: 'currency',
      component: () => import('../views/Currency.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/market',
      name: 'market',
      component: MarketView,
      meta: { requiresAuth: true},
    },
    {
      path: '/',
      name: 'logIn',
      component: LogIn,
    },
    {
      path: '/myarticles',
      name: 'myarticels',
      component: MyArticlesView,
      meta: {requiresAuth: true},
    },
    {
      path: '/addarticle',
      name: 'addarticle',
      component: AddArticleView,
      meta: {requiresAuth: true},
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/');
  } else {
    next();
  }
});