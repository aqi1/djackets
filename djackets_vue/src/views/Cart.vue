<template>
  <div class="page-cart">
    <div class="column is-12">
      <h1 class="title">Cart</h1>
    </div>

    <div class="column is-12 box">
      <table class="table is-fullwidth" v-if="cartTotalLength">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <CartItem v-for="item in cart.items" v-bind:key="item.product.id" v-bind:initialItem="item" v-on:removeFromCart="removeFromCart"/>
        </tbody>
      </table>
      <p v-else>Cart is empty</p>
    </div>

    <div class="column is-12 box" v-if="cartTotalLength">
      <h2 class="subtitle">Summary</h2>
      Subtotal: ${{ cartSubtotalPrice.toFixed(2) }}
      <br/>
      After tax (+8.25%): <strong>${{ cartTotalPrice.toFixed(2) }}</strong>
      <hr>
      <router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import CartItem from '@/components/CartItem.vue'

  export default {
    name: 'Cart',

    components: {
      CartItem
    },

    data() {
      return {
        cart: {
          items: []
        }
      }
    },

    mounted() {
      document.title = 'Cart - Black Dog Apparel'
      this.cart = this.$store.state.cart
      this.alreadyDiscounted = this.$store.state.alreadyDiscounted
    },

    methods: {
      removeFromCart(item) {
        this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        this.$store.commit('updateCartFull', this.cart)

        this.alreadyDiscounted.items = this.alreadyDiscounted.items.filter(i => i.product.id !== item.product.id)
        this.$store.commit('updateDiscountListFull', this.alreadyDiscounted)
      }
    },

    computed: {
      cartTotalLength() {
        return this.cart.items.reduce((acc, curVal) => {
          return acc += curVal.quantity
        }, 0)
      },

      cartSubtotalPrice() {
        return this.cart.items.reduce((acc, curVal) => {
          return acc += curVal.product.price * curVal.quantity
        }, 0)
      },

      cartTotalPrice() {
        return this.cart.items.reduce((acc, curVal) => {
          return acc += curVal.product.price * curVal.quantity * 1.0825
        }, 0)
      }
    }
  }
</script>