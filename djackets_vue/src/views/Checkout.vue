<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Total (With Tax)</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>${{ parseInt(item.product.price).toFixed(2) }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemSubtotal(item).toFixed(2) }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="2">Cart Totals</td>
              <td>{{ cartTotalLength }}</td>
              <td>${{ cartSubtotalPrice.toFixed(2) }}</td>
              <td>${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>

        <template v-if="cartTotalLength">
          <div class="column is-12 box">
            <h2 class="subtitle">Discount Codes</h2>
            <div class="column is-2">
              <div class="field">
                <div class="control">
                  <input type="text" class="input" v-model="discount">
                </div>
              </div>
              <button class="button is-dark" @click="applyDiscount">Apply</button>
            </div>
          </div>
          <div class="column is-12 box">
            <h2 class="subtitle">Shipping Details</h2>
            <p class="has-text-grey mb-4">* Fields are required</p>

            <div class="columns is-multiline">
              <div class="column is-6">
                <div class="field">
                  <label>First name*</label>
                  <div class="control">
                    <input type="text" class="input" v-model="first_name">
                  </div>
                </div>
                <div class="field">
                  <label>Last name*</label>
                  <div class="control">
                    <input type="text" class="input" v-model="last_name">
                  </div>
                </div>

                <div class="field">
                  <label>E-mail*</label>
                  <div class="control">
                    <input type="email" class="input" v-model="email">
                  </div>
                </div>

                <div class="field">
                  <label>Phone*</label>
                  <div class="control">
                    <input type="text" class="input" v-model="phone">
                  </div>
                </div>
              </div>

              <div class="column is-6">
                <div class="field">
                  <label>Address*</label>
                  <div class="control">
                    <input type="text" class="input" v-model="address">
                  </div>
                </div>

                <div class="field">
                  <label>Zip code*</label>
                  <div class="control">
                    <input type="text" class="input" v-model="zipcode">
                  </div>
                </div>

                <div class="field">
                  <label>Notes</label>
                  <div class="control">
                    <input type="text" class="input" v-model="note">
                  </div>
                </div>
              </div>
            </div>

            <div class="notification is-danger mt-4" v-if="errors.length">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>

            <h2 class="subtitle">Payment Details</h2>
            <div id="card-element" class="mb-6">
              <div class="columns is-multiline">
                <div class="column is-4">
                  <div class="field">
                    <label>Card Number*</label>
                    <div class="control">
                      <input type="text" class="input" v-model="card">
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div class="field">
                    <label>CVV*</label>
                    <div class="control">
                      <input type="text" class="input" v-model="cvv">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>

            <button class="button is-dark" @click="submitForm">Pay</button>

          </div>
        </template>
        <template v-else>
            <h2>Cart is empty -- please add items to the cart</h2>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Checkout',

    data() {
      return {
        cart: {
          items: []
        },
        card: {},
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        zipcode: '',
        note: '',
        card: '',
        cvv: '',
        discount: '',
        errors: []
      }
    },

    mounted() {
      document.title = 'Checkout - ShoeMart'
      this.cart = this.$store.state.cart
    },

    methods: {
      getItemSubtotal(item) {
        return item.quantity * item.product.price
      },

      getItemTotal(item) {
        return item.quantity * item.product.price * 1.0825
      },

      applyDiscount() {
        for (let i = 0; i < this.cart.items.length; i++)
        {
          const item = this.cart.items[i]
          if(item.product.discount === this.discount)
          {
            console.log("discount code match")
            this.$store.commit('discountItem', item)
            this.$store.commit('addToDiscountedList', item)
            break
          }
        }

        return
      },

      submitForm() {
        this.errors = []
        
        if (this.first_name === '') {
          this.errors.push('The first name field is missing!')
        }
        if (this.last_name === '') {
          this.errors.push('The last name field is missing!')
        }
        if (this.email === '') {
          this.errors.push('The email field is missing!')
        }
        if (this.phone === '') {
          this.errors.push('The phone field is missing!')
        }
        if (this.address === '') {
          this.errors.push('The address field is missing!')
        }
        if (this.zipcode === '') {
          this.errors.push('The zip code field is missing!')
        }
        if (this.card === '' || this.cvv === '') {
          this.errors.push('The card is invalid!')
        }
        if (!this.errors.length) {
          this.paymentHandler()
        }
      },

      async paymentHandler() {
        const items = []
        for (let i = 0; i < this.cart.items.length; i++) {
          const item = this.cart.items[i]
          const obj = {
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price * item.quantity
          }
          items.push(obj)
        }
        const data = {
          'first_name': this.first_name,
          'last_name': this.last_name,
          'email': this.email,
          'address': this.address,
          'zipcode': this.zipcode,
          'note': this.note,
          'phone': this.phone,
          'items': items
        }
        await axios
          .post('/api/v1/checkout/', data)
          .then(response => {
            this.$store.commit('clearCart')
            this.$router.push('/cart/success')
          })
          .catch(error => {
            this.errors.push('Something went wrong. Please try again')
            console.log(error)
          })
          this.$store.commit('setIsLoading', false)
      },


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