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
import Order from "./views/Order";
import AdminPanel from "./views/AdminPanel";

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
    },
    {
        path: "*",
        redirect: "/login"
    },
    {
        path: "/order",
        component: Order
    },
    {
        path: "/adminpanel",
        component: AdminPanel
    }
]

const router = new VueRouter(
    {
      routes: routes,
      mode: "history",
      base: process.env.BASE_URL,
    }
)

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page

    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
