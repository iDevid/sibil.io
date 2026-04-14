import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)
app.mount('#app')

// Redirect legacy hash routes (e.g. /#/blog/slug → /blog/slug)
if (window.location.hash.startsWith('#/')) {
  router.replace(window.location.hash.slice(1))
}
