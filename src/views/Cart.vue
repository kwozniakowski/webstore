<template>
  <div v-if="items.length > 0">
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
      <tbody v-for='item in items' v-bind:key="'item'+item._id">
      <tr>
        <td >{{item.name}}</td>
        <td >{{item.total}} zł</td>
        <td >{{item.price}} zł</td>
        <td >{{item.weight}}</td>
        <td >{{Math.round(item.weight*item.quantity*100)/100}} g</td>
        <td >
          <input type="number" v-model="item.quantity"
                 @change="changeQuantity(item)"/>
        </td>
        <td >
          <input type="button" value="x" @click="removeFromCart(item)"/>
        </td>
      </tr>
      </tbody>
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
import OrdersDataService from "@/services/OrdersDataService";

export default {
name: "Cart",
  data() {
    return {
      items: [
      ],
      cart: null,
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
            this.items = this.cart.items
            console.log(this.cart)
          })
          .catch(e => {
            console.log(e);
          });

    },

    changeQuantity: function (item) {
      let userId = JSON.parse(localStorage.getItem('user'))["data"]["data"]["_id"]
      let jsonData = {
        "itemId": item._id,
        "quantity": item.quantity,
        "userId": userId
      }
      CartDataService.updateCart(jsonData)
    },

    makeOrder: function () {
      console.log(this.items)
      let payload = {
        acceptDate: new Date().toString(),
        cart: this.cart,
        purchaserData: {
          email: "test",
          username: JSON.parse(localStorage.getItem('user'))["data"]["data"]["username"],
          phoneNumber: "510422262"
        }
      }
      OrdersDataService.create(payload)
    },

    removeFromCart: function (item) {
      try {
        let userId = JSON.parse(localStorage.getItem('user'))["data"]["data"]["_id"]
        let jsonData = {
          "itemId": item._id,
          "quantity": item.quantity,
          "userId": userId
        }
        CartDataService.removeFromCart(jsonData)
        window.location.reload()
      }
      catch (e) {
        console.log(e)
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