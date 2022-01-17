<template>
  <div id="nav">
    <!-- router-link and router-view are custom components that are available
    when we specify app.use(router) in main.js -->
    <!-- router-link is substitution for anchor tag <a></a> specifically for
    single page application routing-->
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <!-- router-view is a temporary placeholder for the page content,
   router will exchange this router-view
  tag with whatever we tell it to in our routes file -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
