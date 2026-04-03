import { createRouter, createWebHashHistory } from 'vue-router'

import AppPrivacyPage from './views/AppPrivacyPage.vue'
import AppSupportPage from './views/AppSupportPage.vue'
import BlogPage from './views/BlogPage.vue'
import BlogPostPage from './views/BlogPostPage.vue'
import CVPage from './views/CVPage.vue'
import ContactPage from './views/ContactPage.vue'
import HomePage from './views/HomePage.vue'
import { lupia, sequence } from './models/apps'

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/lupia/privacy',
      component: AppPrivacyPage,
      props: { app: lupia },
    },
    {
      path: '/lupia/support',
      component: AppSupportPage,
      props: { app: lupia },
    },
    {
      path: '/sequence/privacy',
      component: AppPrivacyPage,
      props: { app: sequence },
    },
    {
      path: '/sequence/support',
      component: AppSupportPage,
      props: { app: sequence },
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
