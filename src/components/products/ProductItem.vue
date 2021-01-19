<template>
  <div id="wrapper" class="wrapper">
    <template v-for="product in products">
      <product-item :product="product" :key="product.id"></product-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "product-item",
  created () {
    if (this.products.length === 0) {
      this.$store.dispatch('allProducts')
    }
  },
  computed: {
    products () {
      return this.$store.getters.allProducts
    }
  },
  data () {
    return {
    }
  },
  components: {
    'product-item': ProductItem
  }
}
</script>

<style scoped>

</style>