import { createStore } from 'vuex'

export default createStore({
  state: {
    cart:{
      items: [],
    },
    alreadyDiscounted:{
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },

  getters: {
  },

  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('alreadyDiscounted')){
        state.alreadyDiscounted = JSON.parse(localStorage.getItem('alreadyDiscounted'))
      } else {
        localStorage.setItem('alreadyDiscounted', JSON.stringify(state.alreadyDiscounted))
      }

      if(localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      }
      else {
        state.token = ''
        state.isAuthenticated = false
      }
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    addToDiscountedList(state, item) {
      const exists = state.alreadyDiscounted.items.filter(i => i.product.id === item.product.id)

      if (!exists.length) {
        state.alreadyDiscounted.items.push(item)
      }

      localStorage.setItem('alreadyDiscounted', JSON.stringify(state.alreadyDiscounted))
    },

    discountItem(state, item){
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      const alreadyAppliedDiscount = state.alreadyDiscounted.items.filter(i => i.product.id === item.product.id)

      if (exists.length && !alreadyAppliedDiscount.length) {
        exists[0].product.price *= 0.8
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    setIsLoading(state, status){
      state.isLoading = status
    },

    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },

    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },

    clearCart(state) {
      state.cart = { items: [] }
      state.alreadyDiscounted = { items: [] }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },

  actions: {
  },

  modules: {
  }
})
