import { createRouter, createWebHashHistory } from 'vue-router'

import AppPrivacyPage from './views/AppPrivacyPage.vue'
import AppSupportPage from './views/AppSupportPage.vue'
import AppTermsPage from './views/AppTermsPage.vue'
import BlogPage from './views/BlogPage.vue'
import BlogPostPage from './views/BlogPostPage.vue'
import CVPage from './views/CVPage.vue'
import ContactPage from './views/ContactPage.vue'
import HomePage from './views/HomePage.vue'
import { apps } from './models/apps'

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
      path: '/:slug/privacy',
      component: AppPrivacyPage,
      props: (route) => ({ app: apps.find((a) => a.slug === route.params.slug) }),
    },
    {
      path: '/:slug/support',
      component: AppSupportPage,
      props: (route) => ({ app: apps.find((a) => a.slug === route.params.slug) }),
    },
    {
      path: '/:slug/terms',
      component: AppTermsPage,
      props: (route) => ({ app: apps.find((a) => a.slug === route.params.slug) }),
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

router.afterEach((to) => {
  window.gtag?.('event', 'page_view', {
    page_path: to.fullPath,
    page_title: document.title,
  })
})

export default router
