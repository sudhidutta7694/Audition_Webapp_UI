import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import DashBoard from '../views/Dashboard.vue'
import Root from '../views/Root.vue'
import AddRound from '../views/AddRound.vue'
import EditRound from '../views/EditRound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/root',
    name: 'Root',
    component: Root
  },
  {
    path: '/addround',
    name: 'AddRound',
    component: AddRound
  },
  {
    path: '/editround',
    name: 'EditRound',
    component: EditRound
  }
  
]

const router = new VueRouter({
  routes
})

export default router


