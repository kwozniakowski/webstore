<template>
<div>
  <div class="row col">
    <div class="col-4" v-for='product in products' :key="product">
      <div class="mt-5 text-center product-view shadow">
        <i class="col-3">{{product.name}}</i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {bus} from '../main';


export default {
name: "Cart",
    data() {
      return {
        products: [
        ]
      }
    },
  created() {
    bus.$on("cartStateChanged", products => {
      this.products = []
      for(let i=0; i< products.length; i++)
      {
        if(products[i].isInChart)
        {
          console.log("dodano")
          this.products.push(products[i])
        }
      }
    } )
  }
}
</script>

<style scoped>

</style>