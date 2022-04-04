<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>

      <ProductBox v-for="product in sortByStockAsc" v-bind:key="product.id" v-bind:product="product" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'
  import ProductBox from '@/components/ProductBox'

  import _ from 'lodash'

  export default{
    name: 'Category',
    data() {
      return {
        category: {
          products: []
        }
      }
    },

    components: {
      ProductBox
    },

    mounted() {
      this.getCategory()
    },

    watch: {
      $route(to, from) {
        if(to.name === 'Category') {
          this.getCategory()
        }
      }
    },

    computed: {
      /* SORTING
      The order (asc/desc) is reversed between the name and params due to the order that
      the <ProductBox> element is populated. Go by name for correct order.
      */
      sortByPriceAsc: function () {
        return _.orderBy(this.category.products, 'price', 'desc')
      },

      sortByPriceDesc: function () {
        return _.orderBy(this.category.products, 'price', 'asc')
      },

      sortByStockAsc: function () {
        return _.orderBy(this.category.products, 'stock', 'desc')
      },

      sortByStockDesc: function () {
        return _.orderBy(this.category.products, 'stock', 'asc')
      }
    },

    methods: {
      async getCategory() {
        const categorySlug = this.$route.params.category_slug

        this.$store.commit('setIsLoading', true)

        axios
          .get(`/api/v1/products/${categorySlug}/`)
          .then(response => {
            this.category = response.data
            document.title = this.category.name + ' - ShoeMart'
          })
          .catch(error => {
            console.log(error)

            toast({
              message: 'Something went wrong. Please try again.',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>