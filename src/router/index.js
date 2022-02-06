import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from '../views/Dashboard.vue'
import landing from '../views/Landing.vue'
import Root from '../views/Root.vue'
import AddRound from '../views/AddRound.vue'
import EditRound from '../views/EditRound.vue'
import Quiz from '../views/Quiz.vue'
import Logs from '../views/Logs.vue'
import St_details from '../views/St_details.vue'
import Profile from '../views/Profile.vue'
import results from '../views/results.vue'
import rules from '../views/rules.vue'
import faq from '../views/faq.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/dash',
    name: 'Landing',
    component: landing
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
  },
  {
    path: '/logs',
    name: 'Logs',
    component:Logs,
  },
  {
    path: '/st_details',
    name: 'St_details',
    component:St_details,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/results',
    name: 'Results',
    component: results,
  },
   {
    path: '/rules',
    name: 'rules',
    component: rules,
  },
    {
    path: '/faq',
    name: 'faq',
    component: faq,
  }
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router


