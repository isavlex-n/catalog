<script>
import products from './data/products'
import ProductFilter from './components/ProductFilter.vue'
import ProductList from './components/ProductList.vue'
import ProductItem from './components/ProductItem.vue'
import BasePagination from './components/BasePagination.vue'
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
        filteredProducts = filteredProducts.filter(
          (product) => product.colors.includes(this.filterColor)
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

<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <a class="header__logo" href="#">
        <img
          src="img/svg/logo-tech.svg"
          alt="Логотип интернет магазина Технозавррр"
          width="190"
          height="33"
        />
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <a class="header__cart" href="cart.html" aria-label="Корзина с товарами">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">3</span>
      </a>
    </div>
  </header>

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

  <footer class="footer">
    <div class="footer__wrapper container">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#"> Каталог </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com">
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Распродажа </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#">
            Заказать звонок
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <svg width="20" height="11" fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <svg width="17" height="14" fill="currentColor">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <svg width="19" height="17" fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются
        в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе
        об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright"> © 2020 Технозавррр </span>
    </div>
  </footer>
</template>
