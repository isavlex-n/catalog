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
    path: '/catalog-ghp/',
    component: MainPage,
  },
  {
    name: 'cart',
    path: '/catalog-ghp/cart',
    component: CartPage,
  },
  {
    name: 'order',
    path: '/catalog-ghp/order',
    component: OrderPage,
  },
  {
    name: 'orderInfo',
    path: '/catalog-ghp/order/:id',
    component: OrderInfoPage,
  },
  {
    name: 'product',
    path: '/catalog-ghp/product/:id',
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