<template>
<div>
  <TopBar>
  </TopBar>
  <select class="form-control mx-3 mt-3"
          name="CategoryInput"
          id="categoryInput"
          v-model.trim="categoryInput"
          @change="categoryInputChanged">
    <option v-for="category in categories" v-bind:key="category">{{category}}</option>
  </select>
  <div class="row col">
    <div class="col-4" v-for='product in productsToShow' v-bind:key="'product'+product._id">
      <div class="card mt-5">
        <i class="card-header">{{product.name}}</i>
        <div class="card-body d-flex flex-column">
          <div class="card-text">{{product.description}}</div>
        </div>
          <div class="mt-auto card-footer">
            <div class="col-row-6 text-lg-left" style="font-size: 1.5rem">{{product.price}} zł</div>
            <button class="btn btn-dark col-row-6 float-right" @click="addToCart(product)">Dodaj do koszyka</button>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TopBar from "../components/TopBar";
import ProductsDataService from "../services/ProductsDataService.js"
import CartDataService from "@/services/CartDataService";
export default {
  name: "Store",
  data () {
    return {
      categoryInput: 'Wszystko',
      products: [],
      productsToShow: [],
      categories: ['Wszystko'],
      chart: [],
    }
  },
  components: {TopBar},
  methods: {
    addToCart: function (product) {
      let jsonProductData = {
        "name": product.name,
        "quantity": 1,
        "price": 3,
        "description": product.description
      }
      CartDataService.addItemToCart(jsonProductData)
    },

    getAllProducts: function() {
      ProductsDataService.getAll()
          .then(response => {
            this.products = response.data.data;
            this.productsToShow = this.products;
            for(var i = 0; i < this.products.length ; i ++)
            {
              if(!this.categories.includes(this.products[i].category))
              {
                this.categories.push(this.products[i].category)
              }
            }
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

    },
    categoryInputChanged: function() {
      this.productsToShow = []
      for(let i = 0; i < this.products.length ; i ++)
      {
        if(this.products[i].category === this.categoryInput)
        {
          this.productsToShow.push(this.products[i]);
        }
        else if(this.categoryInput === "Wszystko")
        {
          this.productsToShow.push(this.products[i]);
        }
      }
    },
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

#categoryInput {
  width: 30%;
}

.card {
  min-height: 20em;
}
.card-header {
  font-style: normal;
  font-weight: bold;
}

</style>