import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import BrandEdit from "../views/BrandEdit.vue";
import BrandList from "../views/BrandList.vue";
import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";
import ProductEdit from "../views/ProductEdit.vue";
import ProductList from "../views/ProductList.vue";
import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import WebUserList from "../views/WebUserList.vue";
import OrderList from "../views/OrderList.vue";
import SalesVolumeList from "../views/SalesVolumeList.vue";
import Login from "../views/Login.vue";
import StockList from "../views/StockList.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'name',
    component: Main,
    children: [
      {
        path: '/brands/create',
        component: BrandEdit
      },
      {
        path: '/brands/edit/:id',
        component: BrandEdit,
        props: true
      },
      {
        path: '/brands/list',
        component: BrandList
      },
      {
        path: '/products/create',
        component: ProductEdit
      },
      {
        path: '/products/edit/:id',
        component: ProductEdit,
        props: true
      },
      {
        path: '/products/list',
        component: ProductList
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/stocks/list',
        component: StockList
      },
      {
        path: '/sales_volumes/list',
        component: SalesVolumeList
      },
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props: true //把id参数注入到ItemEdit页面里面
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: '/web_users/list',
        component: WebUserList
      },
      {
        path: '/orders/list',
        component: OrderList
      }
    ],
  },
  {
    path: '/login',
    component: Login,
    meta: { isPublic: true }
  }
]

const router = new VueRouter({
  routes
})

//跳转路由之前要做什么
//to去哪个页面，from来之哪个页面，next下一步是哪个
router.beforeEach((to, from, next) => {
  //如果没有isPublic
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next() 
})

export default router
