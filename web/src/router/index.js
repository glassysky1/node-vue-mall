import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import PersonalCenter from "../views/PersonalCenter.vue";
import AddressLIst from "../views/AddressLIst.vue";
import CartList from "../views/CartList.vue";
import OrderList from "../views/OrderList.vue";
import OrderSettlement from "../views/OrderSettlement.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/product-details/:id',
    component: ProductDetail,
    props: true
  },
  {
    path: '/register',
    component: Register
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/personal-center',
    component:PersonalCenter,
    children:[
      {
        path:'order-list',
        component:OrderList
      },
      {
        path:'cart-list',
        component:CartList
      },
      {
        path:'address-list',
        component:AddressLIst
      },
    ]
  },
  {
    path:'/order-settlement',
    component: OrderSettlement 
  }
]

const router = new VueRouter({
  routes
})

export default router
