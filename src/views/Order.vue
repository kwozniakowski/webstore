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
        <td >{{product.quantity}}</td>
      </tr>
      </tbody>
    </table>
    <form class="needs-validation wrapper card shadow" novalidate>
        <div class="col">
          <label for="validationCustom01">First name</label>
          <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col">
          <label for="validationCustom02">Last name</label>
          <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col">
          <label for="validationCustomUsername">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
            </div>
            <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div class="col">
          <label for="validationCustom03">City</label>
          <input type="text" class="form-control" id="validationCustom03" placeholder="Miasto" required>
          <div class="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div class="col">
          <label for="validationCustom04">Ulica</label>
          <input type="text" class="form-control" id="validationCustom04" placeholder="Ulica" required>
          <div class="invalid-feedback">
            Please provide a valid state.
          </div>
        <div class="col">
          <label for="validationCustom04">State</label>
          <input type="text" class="form-control" id="validationCustom05" placeholder="Nr" required>
          <div class="invalid-feedback">
            Please provide a valid state.
          </div>
        </div>
        <div class="col">
          <label for="validationCustom05">Zip</label>
          <input type="text" class="form-control" id="validationCustom06" placeholder="Kod pocztowy" required>
          <div class="invalid-feedback">
            Please provide a valid zip.
          </div>
        </div>
      <button class="btn btn-dark" style="margin: 10px" type="submit">Zatwierdź zamówienie</button>
      </div>
    </form>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import CartDataService from "../services/CartDataService";
export default {
  name: "Order",
  components: {TopBar},
  data() {
    return {
      products: []
    }
  },
  methods: {
    getCart: function() {
      let userId = JSON.parse(localStorage.getItem('user'))["data"]["data"]["_id"]
      let data = {"userId": userId}
      CartDataService.getCart(data)
          .then(response => {
            this.cart = response.data.data
            this.products = this.cart.items
            console.log(this.cart)
          })
          .catch(e => {
            console.log(e);
          });

    },
  },
  mounted() {
    this.getCart();

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
</style>