import { createPinia, defineStore } from 'pinia'
import products from '@/data/products'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartProducts: [
      {
        productId: 4,
        amount: 1,
      },
    ],
  }),
  actions: {
    addProductToCart(product) {
      const item = this.cartProducts.find(
        (item) => item.productId === product.productId,
      )
      if (item) {
        item.amount += product.amount
      } else {
        this.cartProducts.push(product)
      }
    },
    updateCartProduct({productId, amount}) {
      const item = this.cartProducts.find(item => item.productId === productId)

      if(item) {
        item.amount = amount
      }
    },
    deleteCartProduct(productId) {
      this.cartProducts = this.cartProducts.filter(item => item.productId !== productId)
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
    },
    cartTotalPrice() {
      return this.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0,
      )
    },
  },
})

export default createPinia()
