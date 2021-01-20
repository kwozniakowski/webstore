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
  },
  methods: {
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