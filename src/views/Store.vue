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
import ProductsDataService from "../services/ProductsDataService.js"
export default {
  name: "Store",
  data () {
    return {
      products: [
        /*{id: '01',name: "Wędlina Krakowska",isInChart: false},
        {id: '07',name: "Bułka poznańska",isInChart: false}
        , {id: '02',name: "Krakowska podsuszana",isInChart: false}
        , {id: '03',name: "Wędliny z meliny",isInChart: false}
        , {id: '04',name: "Chlebek boży",isInChart: false}
        , {id: '05',name: "Angielka",isInChart: false}
        , {id: '06',name: "Szynka",isInChart: false}*/
      ],
      chart: [],
    }
  },
  components: {TopBar},
  methods: {
    addToChart: function (product) {
      product.isInChart = true
      for (let i = 0; i < this.products.length; i++)
      {
        console.log(product.name + product.isInChart)
      }
      bus.$emit("chartStateChanged", this.products)
    },

    getAllProducts: function() {
      ProductsDataService.getAll()
          .then(response => {
            this.products = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },

  mounted() {
    this.getAllProducts();
  }
}
</script>

<style scoped>
.product-view{
  height: 200px;
  border-radius: 10px;
}
</style>