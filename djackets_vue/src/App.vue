<template>

  <div id="wrapper">
  		<!--
    <nav class="navbar is-dark">
	  <div class="navbar-brand">
	    <router-link to="/" class="navbar-item"><strong>Black Dog Apparel</strong></router-link>
		
		<a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		  <span aria-hidden="true"></span>
		</a>
  </div>
	  <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
	  	<div class="navbar-start">
	  		<div class="navbar-item">
	  			<form method="get" action="/search">
	  				<div class="field has-addons">
	  					<div class="control">
	  						<input type="text" class="input" placeholder="Search for a product" name="query">
	  					</div>

	  					<div class="control">
	  						<button class="button is-success">
	  							<span class="icon fas fa-search">
	  							</span>
	  						</button>
	  					</div>
	  				</div>
	  			</form>
	  		</div>
	  	</div>
	    <div class="navbar-end">
		  <router-link to="/tops" class="navbar-item">Tops</router-link>
		  <router-link to="/bottoms" class="navbar-item">Bottoms</router-link>
		  
		  <div class="navbar-item">
		    <div class="buttons">

		    <template v-if="$store.state.isAuthenticated">
			  	<router-link to="/myaccount" class="button is-light">My Account</router-link>
			  </template>

			  <template v-else>
			  	<router-link to="/login" class="button is-light">Log In</router-link>
			  </template>

			  <router-link to="/cart" class="button is-success">
			    <span class="icon"><i class="fas fa-shopping-cart"></i></span>
			    <span>Cart ({{ cartTotalLength }})</span>
			  </router-link>
			</div>
	      </div>
		</div>
	  </div>
	</nav>
	-->
	
  <section class="hero is-primary is-small">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/" class="navbar-item"><strong>BLACK DOG APPAREL</strong></router-link>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenuHeroA" @click="showMobileMenu = !showMobileMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
            <div class="navbar-start">
              <div class="navbar-item">
                <form method="get" action="/search">
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input type="text" class="input" placeholder="Search" name="query">
                    </div>
                    <div class="control">
                      <button class="button is-success">
                        <span class="icon fas fa-search">
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <router-link to="/tops" class="button is-primary is-rounded is-inverted">Tops</router-link>
                  <router-link to="/bottoms" class="button is-primary is-rounded is-inverted">Bottoms</router-link>
                  <template v-if="$store.state.isAuthenticated">
                    <router-link to="/myaccount" class="button is-primary is-success">My Account</router-link>
                  </template>
                  <template v-else>
                    <router-link to="/login" class="button is-primary is-success">Log In</router-link>
                  </template>

                  <router-link to="/cart" class="button is-success">
                    <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                    <span>({{ cartTotalLength }}) Item(s)</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hero content: will be in the middle -->
    <!--
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          WELCOME TO BLACK DOG APPAREL
        </p>
        <p class="subtitle">
          BUY OUR EPIC FAKE SHIRTS
        </p>
      </div>
    </div>
  	-->
  </section>

	<div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
		<div class="lds-dual-ring"></div>
	</div>

	<section class="section">
      <router-view/>
	</section>
	
	<footer class="footer">
	  <p class="has-text-centered">Copyright (c) 2022</p>
	</footer>
  </div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				showMobileMenu: false,
				cart: {
					items: []
				}
			}
		},

		beforeCreate() {
			this.$store.commit('initializeStore')

			const token = this.$store.state.token

			if(token) {
				axios.defaults.headers.common['Authorization'] = "Token " + token
			}
			else {
				axios.defaults.headers.common['Authorization'] = ""
			}
		},

		computed: {
			cartTotalLength() {
				let totalLength = 0

				for(let i = 0; i < this.$store.state.cart.items.length; i++) {
					totalLength += this.$store.state.cart.items[i].quantity
				}

				return totalLength
			}
		}
	}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
	display:  inline-block;
	width: 80px;
	height: 80px;
}

.lds-dual-ring:after {
	content: " ";
	display: block;
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid #ccc;
	border-color: #ccc transparent #ccc transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.is-loading-bar {
	height: 0;
	overflow: hidden;

	-webkit-transition: all 0.3s;
	transition: all 0.3s;

	&.is-loading {
		height: 80px;
	}
}

</style>
