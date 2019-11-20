import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
