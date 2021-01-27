<template>
  <div>
    <TopBar>
    </TopBar>
    <div class="mt-5 container table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Koszt całkowity</th>
          <th scope="col">Data złożenia</th>
          <th scope="col">Data zatwierdzenia</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(order, index) in orders">
          <tr v-bind:key="order._id+'1'" class="accordion-toggle collapsed" :id="'accordion'+index" data-toggle="collapse" data-parent="#accordion1" :href="'#orderCollapse'+index">
            <td class="expand-button"></td>
            <td>{{order._id}}</td>
            <td>{{Math.round(order.total*100)/100}} zł</td>
            <td>{{order.createdAt|dateFormat}}</td>
            <td v-if="order.state.state === 'NIEZATWIERDZONE' ">Brak</td>
            <td v-else-if="order.state.state ==='ANULOWANE'">Anulowane</td>
            <td v-else>{{ order.acceptDate|dateFormat }}</td>
            <td></td>
          </tr>
          <tr v-bind:key="order._id+'2'">
            <td class="border-0 p-0" colspan="3">
              <div :id="'orderCollapse'+index" class="collapse in p-3">
                <table class="table-borderless table">
                  <tr class="accordion-toggle collapsed" id="accordion2" data-toggle="collapse" data-parent="#accordion1" :href="'#purchaserDataCollapse'+index">
                    <td class="border-0">
                      <table class="table mt-3">
                        <thead>
                          <tr>
                            <th>Nazwa użytkownika</th>
                            <th>E-mail</th>
                            <th>Numer telefonu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{ order.purchaserData.username }}</td>
                            <td>x{{order.purchaserData.email}}</td>
                            <td>{{order.purchaserData.phoneNumber}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" :href="'#itemCollapse'+index">
                    <td class="border-0">
                      <b>Przedmioty zakupione:</b>
                      <table class="table table-striped mt-3">
                        <tbody>
                          <tr v-for="item in order.items" v-bind:key="item._id">
                            <td>{{ item.name }}</td>
                            <td>x{{item.quantity}}</td>
                            <td>{{Math.round(item.total*100)/100}} zł</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OrdersDataService from "@/services/OrdersDataService";
import TopBar from "@/components/TopBar";
import moment from "moment"

export default {
  name: "OrderManagment",
  data() {
    return {
      orders: []
    }
  },
  components: {TopBar},
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
  filters: {
    dateFormat: function (value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
      }
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>

</style>