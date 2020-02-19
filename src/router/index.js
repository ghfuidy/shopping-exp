import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/Home/Home')
const Category = () => import('views/Category/Category')
const Cart = () => import('views/Cart/Cart')
const Profile = () => import('views/Profile/Profile')
const Detial = () => import('views/Detial/Detial')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },  {
    path: '/cart',
    component: Cart
  },  {
    path: '/profile',
    component: Profile
  }, {
    path: '/detial/:iid',
    component: Detial
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
