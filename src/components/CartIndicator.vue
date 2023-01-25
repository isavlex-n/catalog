<template>
  <router-link
    class="header__cart"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="/img/svg/sprite.svg#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ cartStore.cartProducts.length }}</span>
  </router-link>
</template>
<script setup>
import { useCartStore } from '@/store'

const cartStore = useCartStore()

</script>
