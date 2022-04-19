<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
        
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span id="sortLabel">{{ this.sortType }}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" @click="setSortType(0)">
                Sort by price (ascending)
              </a>
              <a class="dropdown-item" @click="setSortType(1)">
                Sort by price (descending)
              </a>
              <a class="dropdown-item" @click="setSortType(2)">
                Sort by stock (ascending)
              </a>
              <a class="dropdown-item" @click="setSortType(3)">
                Sort by stock (descending)
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProductBox v-if="this.sortType === 'Sort by price (ascending)'" v-for="product in sortByPriceAsc" v-bind:key="product.id" v-bind:product="product" />
      <ProductBox v-if="this.sortType === 'Sort by price (descending)'" v-for="product in sortByPriceDesc" v-bind:key="product.id" v-bind:product="product" />
      <ProductBox v-if="this.sortType === 'Sort by stock (ascending)'" v-for="product in sortByStockAsc" v-bind:key="product.id" v-bind:product="product" />
      <ProductBox v-if="this.sortType === 'Sort by stock (descending)'" v-for="product in sortByStockDesc" v-bind:key="product.id" v-bind:product="product" />

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
        },
        sortType: 'Sort by price (ascending)'
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
      the <ProductBox> element is populated. Go by function name for correct order.
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
            document.title = this.category.name + ' - Black Dog Apparel'
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
      },

      setSortType(a) {
        if(a === 0)
        {
          this.sortType = 'Sort by price (ascending)'
        }
        else if(a === 1)
        {
          this.sortType = 'Sort by price (descending)'
        }
        else if(a === 2)
        {
          this.sortType = 'Sort by stock (ascending)'
        }
        else if(a === 3)
        {
          this.sortType = 'Sort by stock (descending)'
        }
      }
    }
  }
</script>