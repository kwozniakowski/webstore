<template>
  <div>
    <TopBar></TopBar>
    <div class="container">
      <AddedProductModal></AddedProductModal>
      <select class="form-control mx-3 mt-3"
              name="CategoryInput"
              id="categoryInput"
              v-model.trim="categoryInput"
              @change="categoryInputChanged">
        <option v-for="category in categories" v-bind:key="category">{{category}}</option>
      </select>
      <div v-if="!list" class="row col">
        <div class="col-4" v-for='product in productsToShow' v-bind:key="'product'+product._id">
          <div class="card mt-5">
            <i class="card-header">{{product.name}}</i>
            <div class="card-body d-flex flex-column">
              <div class="card-text">{{product.description}}</div>
            </div>
            <div class="mt-auto card-footer">
              <div class="col-row-6 text-lg-left" style="font-size: 1.5rem">{{product.price}} zł</div>
              <button class="btn btn-dark col-row-6 float-right" v-on:click="addToCart(product)">Dodaj do koszyka</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5" v-else>
        <table class="table card-columns wrapper shadow">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Cena</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          <tr v-for='product in productsToShow' v-bind:key="'product'+product._id">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.price}} zł</td>
            <td><button class="btn btn-dark col-row-6 float-right" v-on:click="addToCart(product)">Dodaj do koszyka</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import ProductsDataService from "../services/ProductsDataService.js"
import CartDataService from "@/services/CartDataService";
import AddedProductModal from "@/components/AddedProductModal";
import CategoriesDataService from "../services/CategoriesDataService";
import {bus} from "@/main"

export default {
  name: "Store",
  data () {
    return {
      categoryInput: 'Wszystko',
      products: [],
      productsToShow: [],
      categories: ['Wszystko'],
      chart: [],
      user: null,
      list: true
    }
  },
  components: {TopBar, AddedProductModal},
  methods: {
    addToCart: async function (product) {
      try {
        this.user = JSON.parse(localStorage.getItem('user'));
      } catch(e) {
        localStorage.removeItem('user');
      }

      let jsonData = {
        "itemId": product._id,
        "name": product.name,
        "quantity": 1,
        "price": product.price,
        "description": product.description,
        "userId": this.user.data.data._id
      }
      await CartDataService.addItemToCart(jsonData)
      bus.$emit("addProduct", product.name)
    },

    getAllProducts: function() {
      ProductsDataService.getAll()
          .then(response => {
            this.products = response.data.data;
            this.productsToShow = this.products;
            this.getAllCategories()
            console.log(response.data.data);
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
    getAllCategories: function () {
      CategoriesDataService.getAll().then(response => {
            for (let i=0; i < response.data.data.length; i++) {
              console.log(response)
              this.categories.push( response.data.data[i].name);
            }
          }
      )
    }
  },

  mounted() {
    this.getAllProducts();
  }
}
</script>

<style scoped>

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