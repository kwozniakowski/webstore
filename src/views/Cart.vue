<template>
  <div>
    <TopBar>
    </TopBar>
    <table class="table card-columns wrapper shadow">
      <thead>
      <tr>
        <th scope="col">Nazwa produktu</th>
        <th scope="col">łączna cena</th>
        <th scope="col">ilość</th>
      </tr>
      </thead>
      <tbody v-for='product in products' v-bind:key="'product'+product._id">
      <tr>
        <td >{{product.name}}</td>
        <td >{{product.price}} zł</td>
        <td >
          <input type="number" value="1">
        </td>
      </tr>
      </tbody>
      <input type="submit" class="btn submitButton" @click="makeOrder()">
    </table>
  </div>
</template>

<script>

import CartDataService from "../services/CartDataService";

export default {
name: "Cart",
    data() {
      return {
        products: [
        ]
      }
    },
  created() {
    this.getCart();
  },
  methods: {
    getCart: function() {
      CartDataService.getCart()
          .then(response => {
            this.products = response.data.data;
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

    },
  makeOrder: function () {
    //przejscie do zamowienia
  }
  }
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