<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <base-field-text
              :error="formError.name"
              placeholder="Введите ваше имя"
              title="ФИО"
              v-model="formData.name"
            >
            </base-field-text>
            <base-field-text
              :error="formError.address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
              v-model="formData.address"
            >
            </base-field-text>
            <base-field-text
              :error="formError.phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
              type="tel"
              v-model="formData.phone"
            >
            </base-field-text>
            <base-field-text
              :error="formError.email"
              placeholder="Введите ваш Email"
              type="email"
              title="Email"
              v-model="formData.email"
            >
            </base-field-text>
            <base-field-textarea
              :error="formError.comment"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
              v-model="formData.comment"
            >
            </base-field-textarea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
          <base-loader v-if="orderLoading"></base-loader>
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products">
              <h3>{{ item.product.title }} {{ item.amount }} шт.</h3>
              <b>{{$filters.numberFormat(item.product.price * item.amount)}} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{$filters.numberFormat(totalPrice)}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-show="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import axios from 'axios'
import { useCartStore } from '@/store'
import { mapState, mapActions } from 'pinia'
import BaseFieldText from '../components/BaseFieldText.vue'
import BaseFieldTextarea from '../components/BaseFieldTextarea.vue'
import BaseLoader from '../components/BaseLoader.vue'

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    }
  },
  computed: {
    ...mapState(useCartStore, ['userAccessKey', 'cartDetailProducts', 'cartTotalPrice']),
    products(store) {
      return store.cartDetailProducts
    },
    totalPrice(store) {
      return store.cartTotalPrice
    }
  },
  methods: {
    ...mapActions(useCartStore, ['resetCart', 'updateOrderInfo']),
    order() {
      this.orderLoading = true
      this.formError = {}
      this.formErrorMessage = ''
      axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.userAccessKey,
            },
          },
        )
        .then((res) => {
          this.resetCart()
          this.updateOrderInfo(res.data)
          this.$router.push({
            name: 'orderInfo',
            params: {
              id: res.data.id,
            },
          })
          this.orderLoading = false
        })
        .catch((error) => {
          this.orderLoading = false
          this.formError = error.response.data.error.request || {}
          this.formErrorMessage = error.response.data.error.message
        })
    },
  },
  components: {
    BaseFieldText,
    BaseFieldTextarea,
    BaseLoader,
  },
}
</script>
<style></style>
