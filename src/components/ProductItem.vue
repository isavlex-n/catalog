<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img
        :src="product.image"
        :alt="product.title"
      />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">{{ product.price }}</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="itemColor in product.colors">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="itemColor"
            v-model="color"
          />
          <span class="colors__value" :style="{backgroundColor: colors[itemColor]}"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
import colors from '../data/colors'
export default {
  setup() {
    return {
      colors
    }
  },
  props: ['product'],
  data() {
    return {
      color: ''
    }
  }
}
</script>