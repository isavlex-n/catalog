<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <product-filter
        v-model:price-from="filterPriceFrom"
        @update:price-from="filteredPriceFrom = $event"
        v-model:price-to="filterPriceTo"
        @update:price-to="filteredPriceTo = $event"
        v-model:category-id="filterCategoryId"
        @update:category-id="filterCategoryId = $event"
        v-model:color="filterColor"
        @update:color="filterColor = $event"
      ></product-filter>
      <section class="catalog">
        <product-list :products="productsPage"></product-list>
        <base-pagination
          v-model:page="page"
          @update:page="page = $event"
          :count="countProducts"
          :per-page="productsPerPage"
        ></base-pagination>
      </section>
    </div>
  </main>
</template>
<script>
import products from '@/data/products'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductList from '@/components/ProductList.vue'
import ProductItem from '@/components/ProductItem.vue'
import BasePagination from '@/components/BasePagination.vue'
export default {
  components: {
    ProductFilter,
    ProductList,
    ProductItem,
    BasePagination,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      page: 1,
      productsPerPage: 3,
    }
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        )
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo,
        )
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        )
      }
      if (this.filterColor) {
        filteredProducts = filteredProducts.filter((product) =>
          product.colors.includes(this.filterColor),
        )
      }
      return filteredProducts
    },
    productsPage() {
      const offset = (this.page - 1) * this.productsPerPage
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    countProducts() {
      return this.filteredProducts.length
    },
  },
}
</script>
