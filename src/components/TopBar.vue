<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid row">
      <router-link class="navbar-brand" to="/">Strona główna</router-link>
      <router-link class="navbar-brand" to="/about">O nas</router-link>
      <router-link class="navbar-brand" to="/store">Nasze produkty</router-link>
      <router-link class="navbar-brand" to="/cart">Twój koszyk</router-link>
      <router-link v-if="!isLogged" class="navbar-brand" to="/login">Login</router-link>
      <a v-else class="navbar-brand" v-on:click="logout()" style="cursor: pointer">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      items : [
        {
          name: "File",
          menu: [{ name: "Open"}, {name: "New Window"}, {name: "Exit"}]
        },
        {
          name: "Edit",
          menu: [{ name: "Cut"}, {name: "Copy"}, {name: "Paste"}]
        }
      ],
      isLogged : localStorage.getItem('user')
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('user')
      this.isLogged = localStorage.getItem('user')
      this.$router.push("/login")
    },
  }
}
</script>

<style scoped>

</style>