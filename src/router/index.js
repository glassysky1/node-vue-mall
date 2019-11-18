import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import BrandEdit from "../views/BrandEdit.vue";
import BrandList from "../views/BrandList.vue";
import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";
import ProductEdit from "../views/ProductEdit.vue";
import ProductList from "../views/ProductList.vue";
import SalesVolumeList from "../views/SalesVolumeList.vue";
import StockList from "../views/StockList.vue";
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
      {
        path:'/ads/create',
        component:AdEdit
      },
      {
        path:'/ads/edit/:id',
        component:AdEdit,
        props:true
      },
      {
        path:'/ads/list',
        component:AdList
      },
      {
        path:'/stocks/list',
        component:StockList
      },
      {
        path:'/sales_volumes/list',
        component:SalesVolumeList
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
