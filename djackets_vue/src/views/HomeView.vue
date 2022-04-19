<template>
  <div class="home">
    <!--
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Black Dog Apparel
        </p>
        <p class="subtitle">
          virtual clothes for the ideal you
        </p>
      </div>
    </section>
    -->

    <figure class="image is-3by1">
      <img src='@/assets/splash.png'>
    </figure> 

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox v-for="product in latestProducts" v-bind:key="product.id" v-bind:product="product" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProductBox from '@/components/ProductBox'

  export default {
    name: 'HomeView',
    data(){
      return{
        latestProducts: []
      }
    },

    components: {
      ProductBox
    },

    mounted(){
      this.getLatestProducts()
      document.title = 'Home - Black Dog Apparel'
    },

    methods:{
      getLatestProducts(){
        axios
          .get('/api/v1/latest-products')
          .then(response => {
            this.latestProducts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>