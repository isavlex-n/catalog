import { createPinia, defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  }),
  actions: {
    loadOrderInfo(orderId) {
      return axios
        .get(`${import.meta.env.VITE_SERVER_URL}api/orders/${orderId}`, {
          params: {
            userAccessKey: this.userAccessKey,
          },
        })
        .then((res) => {
          this.orderInfo = res.data
        })
    },
    updateOrderInfo(orderInfo) {
      this.orderInfo = orderInfo
    },
    resetCart() {
      this.cartProducts = []
      this.cartProductsData = []
    },
    addProductToCart({ productId, amount }) {
      return axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: this.userAccessKey,
            },
          },
        )
        .then((res) => {
          this.cartProductsData = res.data.items
          this.syncCartProducts()
        })
    },
    updateCartProduct({ productId, amount }) {
      const item = this.cartProducts.find(
        (item) => item.productId === productId,
      )

      if (item) {
        item.amount = amount
      }
    },
    deleteCartProduct(productId) {
      return axios
        .delete(`${import.meta.env.VITE_SERVER_URL}api/baskets/products`, {
          data: {
            productId,
          },
          params: {
            userAccessKey: this.userAccessKey,
          },
        })
        .then((res) => {
          this.cartProductsData = res.data.items
          this.cartProducts = this.cartProducts.filter(
            (p) => p.id === productId,
          )
        })
        .then(() => {
          this.syncCartProducts()
        })
    },
    updateUserAccessKey(key) {
      this.userAccessKey = key
    },
    syncCartProducts() {
      this.cartProducts = this.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }))
    },
    loadCart() {
      return axios
        .get(`${import.meta.env.VITE_SERVER_URL}api/baskets`, {
          params: {
            userAccessKey: this.userAccessKey,
          },
        })
        .then((res) => {
          if (!this.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey)
            this.userAccessKey = res.data.user.accessKey
          }
          this.cartProductsData = res.data.items
          this.syncCartProducts()
        })
    },
    updateCartProductAmount({ productId, amount }) {
      this.updateCartProduct({ productId, amount })
      if (amount < 1) return
      return axios
        .put(
          `${import.meta.env.VITE_SERVER_URL}api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: this.userAccessKey,
            },
          },
        )
        .then((res) => {
          this.cartProductsData = res.data.items
        })
        .then(() => {
          this.syncCartProducts()
        })
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = this.cartProductsData.find(
          (p) => p.product.id === item.productId,
        ).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        }
      })
    },
    cartTotalPrice() {
      return this.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0,
      )
    }
  },
})

export default createPinia()
