<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <!-- router-link and router-view are custom components that are available
    when we specify app.use(router) in main.js -->
    <!-- router-link is substitution for anchor tag <a></a> specifically for
    single page application routing-->
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div @click="toggleSidebar()" href="#" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>
  <!-- router-view is a temporary placeholder for the page content,
   router will exchange this router-view
  tag with whatever we tell it to in our routes file -->
  <router-view :inventory="inventory" :addToCart="addToCart" />
  <Sidebar
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    @remove-article="removeFromCart"
  />
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import food from '@/food.json'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      // my solution
      // const totalQ = Object.entries(this.cart).reduce((acc, curr, index) => {
      //   return acc + curr[1];
      // }, 0)
      // return totalQ;
      // video solution, better bc Object.values only includes the quantities and not the keys as an array
      // of [key, value], index is only optional in reduce and not needed in this case
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  methods: {
    addToCart (name, index) {
      // null check for this.cart[name], since += on an undefined value results in NaN
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += this.inventory[index].quantity
      // clear number entered in input form after adding to cart
      this.inventory[index].quantity = ''
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    // video solution is to pass this function as a prop and then call it from the child component,
    // my solution was to emit an event "remove-article" in the child component @click and react to it in the parent
    removeFromCart (name) {
      delete this.cart[name]
    }
  }
}
</script>
