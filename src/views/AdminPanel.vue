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
      <div class="col-4" v-for='(product) in productsToShow' v-bind:key="'product'+product._id">
        <div class="card mt-5">
          <i class="card-header">{{product.name}}</i>
          <div class="card-body d-flex flex-column">
            <form>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Cena</label>
                <div class="col-sm-8">
                  <input v-model="product.price" type="text"
                         class="form-control" placeholder=product.price>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Waga</label>
                <div class="col-sm-8">
                  <input v-model="product.weight" type="text"
                         class="form-control" placeholder=product.weight>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Kategoria</label>
                <select class="form-control col-sm-8"
                        name="CategoryInput"
                        v-model.trim="product.category"
                        v-model="product.category">
                  <option v-for="category in categories" v-bind:key="category">{{category}}</option>
                </select>
              </div>
              <div class="form-group row justify-content-center">
                <button class="btn btn-dark col-sm-6 col-form-label"
                        @click="updateProduct(product)">Zatwierdź</button>
              </div>
              <div class="form-group row justify-content-center">
                <button class="btn btn-danger col-sm-6 col-form-label"
                        @click="deleteProduct(product)">Usuń produkt</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card mt-5">
          <i class="card-header justify-content-center" style="background-color: forestgreen">
              <div class="col-sm-12">
                <input type="text" v-model="newProduct.name"
                       class="form-control" id="inputNewName" placeholder="Nazwa">
              </div>
          </i>
          <div class="card-body d-flex flex-column">
            <form>
              <div class="form-group row">
                <div class="col-sm-4">
                  <input type="text" v-model="newProduct.price"
                         class="form-control" id="inputNewPrice" placeholder="Cena">
                </div>
                <div class="col-sm-4">
                  <input type="text" v-model="newProduct.weight"
                         class="form-control" id="inputNewWeight" placeholder="Waga">
                </div>
                <div class="col-sm-4">
                  <input type="text" v-model="newProduct.quantity"
                         class="form-control" id="inputNewQuantity" placeholder="Ilość">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <input type="text" v-model="newProduct.description"
                         class="form-control" id="inputNewDescription" placeholder="Opis">
                </div>
              </div>
              <div class="form-group row">
                <select class="form-control col-sm-12"
                        name="CategoryInput"
                        id="setNewCategoryInput"
                        v-model="newProduct.category">
                  <option v-for="category in categories" v-bind:key="category">{{category}}</option>
                </select>
              </div>
              <div class="form-group row justify-content-center">
                <button class="btn btn-success col-sm-6 col-form-label"
                        @click="createProduct(newProduct)">Dodaj</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsDataService from "../services/ProductsDataService";
import TopBar from "../components/TopBar";
import CategoriesDataService from "../services/CategoriesDataService";
export default {
  name: "AdminPanel",
  components: {
    TopBar
  },
  data () {
    return {
      categoryInput: 'Wszystko',
      products: [],
      productsToShow: [],
      newProduct: {
        name: "",
        price: "",
        weight: "",
        category: "",
        quantity: "",
        description: ""
      },
      categories: ['Wszystko'],
      chart: [],
      user: null,
    }
  },
  methods: {
    getAllProducts: function() {
      ProductsDataService.getAll()
          .then(response => {
            this.products = response.data.data;
            this.productsToShow = this.products;
            this.getAllCategories()
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

    getAllCategories: function () {
      CategoriesDataService.getAll().then(response => {
            for (let i=0; i < response.data.data.length; i++) {
              this.categories.push( response.data.data[i].name);
            }
          }
      )
    },

    deleteProduct: function (product) {
      let id = product._id
      ProductsDataService.deleteProduct(id)
    },

    updateProduct: function (product) {
      let jsonData = {
        "id": product._id,
        "name": product.name,
        "price": product.price,
        "weight": product.weight,
        "category": product.category,
        "description": product.description,
        "quantity": product.quantity
      }
      ProductsDataService.updateProduct(jsonData);
    },

    createProduct: function (product) {
      console.log(this.newProduct);
      let jsonData = {
        "name": product.name,
        "price": parseFloat(product.price),
        "weight": parseFloat(product.weight),
        "category": product.category,
        "description": product.description,
        "quantity": parseInt(product.quantity)
      }
      ProductsDataService.createProduct(jsonData);
    }

  },

  mounted() {
    this.getAllProducts();

  }
}
</script>

<style scoped>
.card {
  min-height: 23em;
}

.card-header {
  min-height: 4em;
}

.formInput {
  border-radius: 5px;
  padding: 5px;
  border-width: 1px;
  border-color: #cccccc;
}
</style>