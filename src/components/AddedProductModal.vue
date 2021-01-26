<template>
  <!-- Modal -->
  <div v-if="showModal">
    <transition name="fade" mode="out-in">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Dodano do koszyka!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Dodano {{productName}}. Łączna wartość koszyka: {{cart.subTotal}} zł</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showModal = false">Kontynuuj zakupy</button>
                <router-link to="/cart"><button type="button" class="btn btn-secondary">Do koszyka</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CartDataService from "@/services/CartDataService";
import {bus} from "../main.js"

export default {

  name: "AddedProductModal",
  data() {
    return {
      cart: null,
      productName: null,
      showModal: false,
    }
  },
  created() {
    bus.$on("addProduct", (productName) =>{
          this.getCart();
          this.productName = productName
          this.showModal = true
        }
    )
  },
  methods: {
    getCart: async function(){
      let userId = JSON.parse(localStorage.getItem('user'))["data"]["data"]["_id"]
      let data = {"userId": userId}
      await CartDataService.getCart(data)
          .then(response => {
            console.log(response.data.data)
            this.cart = response.data.data
          })
          .catch(e => {
            console.log(e);
          });

    },
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s ease;
  }

  .fade-enter-from,
  .fade-leave-active {
    opacity: 0;
  }

</style>