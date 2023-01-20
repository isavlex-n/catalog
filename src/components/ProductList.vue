<template>
  <ul class="catalog__list">
    <product-item
      v-for="product in products"
      :product="product"
      :key="product.id"
    />
  </ul>
</template>
<script>
import ProductItem from './ProductItem.vue'
export default {
  props: ['products'],
  components: {
    ProductItem,
  },
}
</script>
