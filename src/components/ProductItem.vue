<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="gotoPage('product', { id: product.id })"
    >
      <img :src="product.image" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">{{ productPrice }}</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="itemColor in product.colors">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="itemColor"
            v-model="color"
          />
          <span
            class="colors__value"
            :style="{ backgroundColor: colors[itemColor] }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
import colors from '@/data/colors'
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'

export default {
  setup() {
    return {
      colors,
    }
  },
  props: ['product'],
  data() {
    return {
      color: '',
    }
  },
  methods: {
    gotoPage,
  },
  computed: {
    productPrice() {
      return numberFormat(this.product.price)
    }
  }
}
</script>
