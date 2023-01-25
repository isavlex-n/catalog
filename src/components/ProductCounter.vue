<template>
  <div class="form__counter product__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click="minusProductAmount"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="/img/svg/sprite.svg#icon-minus"></use>
      </svg>
    </button>

    <input type="number" v-model.number="amount" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click="plusProductAmount"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="/img/svg/sprite.svg#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['product-amount'],
  emits: ['update:product-amount'],
  computed: {
    minusProductAmount() {
      if (this.productAmount === 1) return
      return this.count(this.amount - 1)
    },
    plusProductAmount() {
      return this.count(this.amount + 1)
    },
    amount: {
      get() {
        return this.productAmount
      },
      set(value) {
        if (this.productAmount < 1) {
          this.count(1)
          return
        }
        this.count(value)
      } 
    }
  },
  methods: {
    count(count) {
      this.$emit('update:product-amount', count)
    }
  }
}
</script>
