import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import DashBoard from '../views/Dashboard.vue'
import Dashboard_Student from '../views/Dashboard_student.vue'
import Root from '../views/Root.vue'
import AddRound from '../views/AddRound.vue'
import EditRound from '../views/EditRound.vue'
import Quiz from '../views/Quiz.vue'

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
  },
  {
    path: '/dashboard_student',
    name: 'DashboardStudent',
    component: Dashboard_Student
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
  }
  
]

const router = new VueRouter({
  routes
})

export default router


