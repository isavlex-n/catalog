<template>
  <base-loader v-if="!orderInfo"></base-loader>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link" href="index.html"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'order'}" class="breadcrumbs__link"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Заказ оформлен <span>№ {{ orderInfo.id }}</span></h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ orderInfo.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderInfo.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> картой при получении </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in orderInfo.basket.items">
              <h3>{{ item.product.title }} {{ item.quantity }} шт.</h3>
              <b>{{$filters.numberFormat(item.product.price * item.quantity)}} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> товара на сумму <b>{{$filters.numberFormat(orderInfo.totalPrice)}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { useCartStore } from '@/store'
import { mapState } from 'pinia'
import BaseLoader from '@/components/BaseLoader.vue'

export default {
  setup() {
    const cartStore = useCartStore()
    return {
      loadOrderInfo: cartStore.loadOrderInfo,
    }
  },
  computed: {
    ...mapState(useCartStore, ['orderInfo'])
  },
  created() {
    if (this.orederInfo && this.orderInfo.id === this.$route.params.id) {
      return
    }
    this.loadOrderInfo(this.$route.params.id)
  },
  components: {
    BaseLoader,
  }
}
</script>
