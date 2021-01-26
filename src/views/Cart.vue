<template>
  <div v-if="products.length > 0">
    <TopBar>
    </TopBar>
    <table class="table card-columns wrapper shadow">

      <thead>
      <tr>
        <th scope="col">Nazwa produktu</th>
        <th scope="col">Łączna cena</th>
        <th scope="col">Cena za sztukę</th>
        <th scope="col">g/szt.</th>
        <th scope="col">Masa całkowita</th>
        <th scope="col">Ilość</th>
      </tr>
      </thead>
      <tbody v-for='product in products' v-bind:key="'product'+product._id">
      <tr>
        <td >{{product.name}}</td>
        <td >{{product.price*product.quantity}} zł</td>
        <td >{{product.price}} zł</td>
        <td >{{product.weight}}</td>
        <td >{{Math.round(product.weight*product.quantity*100)/100}} g</td>
        <td >
          <input type="number" v-model="product.quantity"
                 @change="changeQuantity(product)"/>
        </td>
      </tr>
      </tbody>
      <tr class="table card-columns wrapper shadow">
      Total: {{this.total}}
      </tr>
      <router-link to="/order">
      <input type="submit" class="btn submitButton mt-3" @click="makeOrder()">
      </router-link>
    </table>
  </div>
  <div v-else class="text-center">
    <TopBar></TopBar>

    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main role="main" class="mt-5 inner cover">
        <h1 class="cover-heading">Wygląda na to, że Twój koszyk jest pusty.</h1>
        <p class="lead">Zachęcamy do przejścia do sekcji <router-link to="/store">"Nasze produkty"</router-link>, aby zobaczyć co mamy w ofercie oraz wybrać coś dla siebie.</p>
      </main>
    </div>
  </div>
</template>

<script>

import CartDataService from "../services/CartDataService";
import TopBar from "@/components/TopBar";

export default {
name: "Cart",
  data() {
    return {
      products: [
      ],
      cart: null,
      total: 0
    }
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart: function() {

      let userId = JSON.parse(localStorage.getItem('user'))["data"]["data"]["_id"]
      let data = {"userId": userId}
      CartDataService.getCart(data)
          .then(response => {
            this.cart = response.data.data
            this.products = this.cart.items
            this.setTotal()
            console.log(this.cart)
          })
          .catch(e => {
            console.log(e);
          });

    },

    changeQuantity: function (product) {
      this.setTotal()
      let data = {
        "quantity": product.quantity
      }
      console.log(product)
      CartDataService.updateCart(data)
    },

    makeOrder: function () {

    },
    setTotal: function () {
      this.total = 0
      for(let product in this.products)
      {
        this.total = this.total + (parseFloat(product.price) * parseFloat(product.quantity) )
      }
    }
  },
  components: {TopBar},
}
</script>

<style scoped>
.wrapper {

  width: 60%;
  min-height: 100%;
  height: auto;
  padding: 50px 50px;
  margin: 50px 50px;
  border-radius: 20px;
}
.submitButton {
  width: 100%;
  background-color: darkred;
  color: white;
}
</style>