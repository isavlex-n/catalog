import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import OrderInfoPage from '@/pages/OrderInfoPage.vue'

const routes = [
  {
    name: 'main',
    path: '/',
    component: MainPage,
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartPage,
  },
  {
    name: 'order',
    path: '/order',
    component: OrderPage,
  },
  {
    name: 'orderInfo',
    path: '/order/:id',
    component: OrderInfoPage,
  },
  {
    name: 'product',
    path: '/product/:id',
    component: ProductPage,
  },
  {
    name: 'notFound',
    path: '/*',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 