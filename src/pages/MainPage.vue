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
        <base-loader v-if="productsLoading"></base-loader>
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
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
import axios from 'axios'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductList from '@/components/ProductList.vue'
import ProductItem from '@/components/ProductItem.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseLoader from '@/components/BaseLoader.vue'
export default {
  components: {
    ProductFilter,
    ProductList,
    ProductItem,
    BasePagination,
    BaseLoader
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${import.meta.env.VITE_SERVER_URL}api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false))
      }, 0)
    },
  },
  created() {
    this.loadProducts()
  },
  computed: {
    productsPage() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            }
          })
        : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
    filterColor() {
      this.loadProducts()
    }
  },
}
</script>
