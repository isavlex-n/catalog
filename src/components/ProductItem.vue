<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">{{ $filters.numberFormat(product.price) }}</span>

  <product-color-picker
    :colors="product.colors"
    :is-black="true"
  ></product-color-picker>
  </li>
</template>
<script>
import ProductColorPicker from './ProductColorPicker.vue'
export default {
  props: ['product'],
  data() {
    return {
      color: 0,
    }
  },
  components: {
    ProductColorPicker
  }
}
</script>
