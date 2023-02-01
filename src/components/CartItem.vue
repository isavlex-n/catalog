<template>
  <base-loader v-if="cartLoading"></base-loader>
  <li class="cart__item product" v-else>
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      {{ item.productId }}
    </span>
    <product-counter
      v-model:product-amount="amount"
      @update:product-amount="amount = $event"
    ></product-counter>

    <b class="product__price">
      {{ $filters.numberFormat(item.amount * item.product.price) }}
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="/img/svg/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'pinia'
import { useCartStore } from '@/store'
import BaseLoader from './BaseLoader.vue'
import ProductCounter from '@/components/ProductCounter.vue'

export default {
  setup() {
    const cartStore = useCartStore()

    return {
      updateCartProductAmount: cartStore.updateCartProductAmount,
    }
  },
  data() {
    return {
      cartLoading: false,
    }
  },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.productId,
          amount: value,
        })
      },
    },
  },
  methods: {
    ...mapActions(useCartStore, ['deleteCartProduct']),
    deleteProduct(productId) {
      this.cartLoading = true
      this.deleteCartProduct(productId).then(() => {
        this.cartLoading = false
      })
    },
  },
  components: {
    ProductCounter,
    BaseLoader,
  },
}
</script>
