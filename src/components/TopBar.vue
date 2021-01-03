<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid row">
      <router-link class="navbar-brand" to="/">Strona główna</router-link>
      <router-link class="navbar-brand" to="/about">O nas</router-link>
      <router-link class="navbar-brand" to="/products">Nasze produkty</router-link>
      <router-link class="navbar-brand" to="/chart">Twój koszyk</router-link>
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
      ]
    }
  },
}
</script>

<style scoped>

</style>