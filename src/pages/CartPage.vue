<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} ед. товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <base-loader v-if="!products"></base-loader>
          <ul class="cart__list">
            <cart-item  v-for="item in products" :key="item.productId" :item="item"></cart-item>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ $filters.numberFormat(totalPrice) }} ₽</span>
          </p>

          <router-link :to="{name: 'order'}" v-slot="{ navigate }">
            <button @click="navigate" :disabled="!products.length" class="cart__button button button--primery">Оформить заказ</button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { useCartStore } from '@/store'
import { mapState } from 'pinia'
import CartItem from '@/components/CartItem.vue'
import BaseLoader from '../components/BaseLoader.vue'

export default {
  computed: {
    ...mapState(useCartStore, ['cartDetailProducts', 'cartTotalPrice']),
    products(store) {
      return store.cartDetailProducts
    },
    totalPrice(store) {
      return store.cartTotalPrice
    }
  },
  components: {
    CartItem,
    BaseLoader,
  }
}
</script>