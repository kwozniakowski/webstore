<template>
  <h1>Cokolwiek</h1>
</template>

<script>
import OrdersDataService from "@/services/OrdersDataService";

export default {
  name: "OrderManagment",
  data() {
    return {
      orders: []
    }
  },
  methods: {
    getAllOrders: function() {
      OrdersDataService.getAll()
          .then(response => {
            this.orders = response.data.data;
            console.log(this.orders)
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>

</style>