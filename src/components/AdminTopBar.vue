<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid row">
      <router-link class="navbar-brand" to="/adminpanel">Zarządzaj produktami</router-link>
      <router-link class="navbar-brand" to="/ordermanagement">Zarządzaj zamówieniami</router-link>
      <router-link class="navbar-brand" to="/">Strona główna</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AdminTopBar"
}
</script>

<style scoped>

</style>