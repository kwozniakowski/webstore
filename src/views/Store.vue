<template>
<div>
  <TopBar>
  </TopBar>
  <div class="row col">
    <div class="col-4" v-for='product in products' :key="product">
      <div class="mt-5 text-center product-view shadow">
        <i class="col-3">{{product.name}}</i>
        <button class="btn btn-dark" @click="addToChart(product)">Dodaj do koszyka</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TopBar from "../components/TopBar";
import {bus} from "../main";
export default {
  name: "Store",
  data () {
    return {
      products: [
        {id: '01',name: "Wędlina Krakowska",isInCart: false},
        {id: '07',name: "Bułka poznańska",isInCart: false}
        , {id: '02',name: "Krakowska podsuszana",isInCart: false}
        , {id: '03',name: "Wędliny z maliny",isInCart: false}
        , {id: '04',name: "Chlebek boży",isInCart: false}
        , {id: '05',name: "Angielka",isInCart: false}
        , {id: '06',name: "Szynka",isInCart: false}
        ,{id: '07',name: "Wędlinka",isInCart: false}
      ],
      chart: [],
    }
  },
  components: {TopBar},
  methods: {
    addToChart: function (product) {
      product.isInCart = true
      for (let i = 0; i < this.products.length; i++)
      {
        console.log(product.name + product.isInChart)
      }
      bus.$emit("cartStateChanged", this.products)
    }
  }
}
</script>

<style scoped>
.product-view{
  height: 200px;
  border-radius: 10px;
}
</style>