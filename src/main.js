import { createApp } from 'vue'

import pinia from '@/store'
import router from '@/router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.config.globalProperties.$filters = {
  numberFormat(value) {
    return Intl.NumberFormat().format(value)
  }
}

app.use(router)
app.use(pinia)
app.mount('#app')