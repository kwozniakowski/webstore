import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Store from "./views/Store"
import Cart from "./views/Cart"
import Login from "./views/Login"
import Register from "./views/Register";

Vue.use(VueRouter)

export const bus = new Vue()

export const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/store",
      component: Store
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    }

]

const router = new VueRouter(
    {
      routes: routes,
      mode: "history",
      base: process.env.BASE_URL,
    }
)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
