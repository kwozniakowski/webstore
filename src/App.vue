<template>
  <router-view>
  <div id="app">

    <Home></Home>

  </div>
  </router-view>
</template>

<script>
import Home from './views/Home.vue'
//import About from "./views/About";
//import Store from "./views/Store"
export default {
  name: 'App',
  components: {
    Home,
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
