let app = Vue.createApp({
    data() {
      return {
        showSidebar: false,
        inventory: [],
        cart: {}
      }
    },
    methods: {
      addToCart(name, index) {
        // null check for this.cart[name], since += on an undefined value results in NaN
        if (!this.cart[name]) this.cart[name] = 0;
        this.cart[name] += this.inventory[index].quantity;
        // clear number entered in input form after adding to cart
        this.inventory[index].quantity = "";
      },
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
      },
      // video solution is to pass this function as a prop and then call it from the child component,
      // my solution was to emit an event "remove-article" in the child component @click and react to it in the parent
      removeFromCart(name) {
        delete this.cart[name];
      }
    },
    // watches changes in variables and update result
    computed: {
      totalQuantity() {
        // my solution
        // const totalQ = Object.entries(this.cart).reduce((acc, curr, index) => {
        //   return acc + curr[1];
        // }, 0)
        // return totalQ;
        
        // video solution, better bc Object.values only includes the quantities and not the keys as an array 
        // of [key, value], index is only optional in reduce and not needed in this case
        return Object.values(this.cart).reduce((acc, curr) => {
          return acc + curr;
        }, 0)
        }
    },
    // use mounted hook to read in data when page loads
    // make call asynchronous to prevent long loading time
    async mounted() {
      // const since it is not expected to change
      const inventoryJson = await fetch('./food.json');
      const inventoryData = await inventoryJson.json();
      this.inventory = inventoryData;
    }
});
app.component(('sidebar'), {
props: ['toggle', 'cart', 'inventory'],
methods: {
    getPrice(name) {
    const product = this.inventory.find((p) => {
        return p.name === name;
    })
    return product.price.USD;
    },
    calculateTotal() {
    // My solution:
    // let sum = 0;
    // for(let i in this.cart) {
    //   sum += (this.cart[i] * this.getPrice(i));
    // }
    // return sum;
    
    // Video solution
    // each entry "curr" will be an array of [key, value]
    const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]));
    }, 0)
    return total.toFixed(2);
    },
    removeArticle(name) {
    this.$emit('remove-article', name)
    }
},
template: `
<aside class="cart-container">
<div class="cart">
    <h1 class="cart-title spread">
    <span>
        Cart
        <i class="icofont-cart-alt icofont-1x"></i>
    </span>
    <button @click="toggle" class="cart-close">&times;</button>
    </h1>

    <div class="cart-body">
    <table class="cart-table">
        <thead>
        <tr>
            <th><span class="sr-only">Product Image</span></th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th><span class="sr-only">Actions</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(quantity, key, i) in cart" :key="i">
            <td><i class="icofont-carrot icofont-3x"></i></td>
            <td>{{ key }}</td>
            <td>\${{ getPrice(key) }}</td>
            <td class="center">{{ quantity }}</td>
            <td>\${{ quantity * getPrice(key) }}</td>
            <td class="center">
            <button @click="removeArticle(key)" class="btn btn-light cart-remove">
                &times;
            </button>
            </td>
        </tr>
        </tbody>
    </table>

    <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
    <div class="spread">
        <span><strong>Total:</strong> \${{ calculateTotal() }} </span>
        <button class="btn btn-light">Checkout</button>
    </div>
    </div>
</div>
</aside>
`
});
app.mount('#app');