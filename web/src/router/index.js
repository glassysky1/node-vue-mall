import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
