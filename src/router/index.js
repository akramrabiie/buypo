import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import LiveOrders from '../views/LiveOrders.vue'
import Orders from '../views/Orders.vue'
import EditProduct from '../views/EditProduct.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/live-orders',
    name: 'Live Ordes',
    component: LiveOrders
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/products/new',
    name: 'products',
    component: EditProduct
  },
  {
    path: '/categories',
    name: 'categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
