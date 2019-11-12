import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import BrandEdit from "../views/BrandEdit.vue";
import BrandList from "../views/BrandList.vue";
import ProductEdit from "../views/ProductEdit.vue";
import ProductList from "../views/ProductList.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'name',
    component: Main,
    children:[
      {
        path:'/brands/create',
        component:BrandEdit
      },
      {
        path:'/brands/edit/:id',
        component:BrandEdit,
        props:true
      },
      {
        path:'/brands/list',
        component:BrandList
      },
      {
        path:'/products/create',
        component:ProductEdit
      },
      {
        path:'/products/edit/:id',
        component:ProductEdit,
        props:true
      },
      {
        path:'/products/list',
        component:ProductList
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
