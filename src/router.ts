import { createRouter, createWebHistory } from 'vue-router'

import BlogPage from './views/BlogPage.vue'
import BlogPostPage from './views/BlogPostPage.vue'
import CVPage from './views/CVPage.vue'
import ContactPage from './views/ContactPage.vue'
import HomePage from './views/HomePage.vue'
import PrivacyPage from './views/PrivacyPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/blog',
      component: BlogPage,
    },
    {
      path: '/blog/:slug',
      component: BlogPostPage,
    },
    {
      path: '/cv',
      component: CVPage,
    },
    {
      path: '/contact',
      component: ContactPage,
    },
    {
      path: '/lupia/support',
      component: ContactPage,
    },
    {
      path: '/lupia/privacy',
      component: PrivacyPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
