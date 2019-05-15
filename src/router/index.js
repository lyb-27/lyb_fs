import Vue from 'vue'
import VueRouter from 'vue-router'
import menu from './menu'

import staticRoutes from './static-routes'
console.log(menu)
Vue.use(VueRouter)

const routes = [
  ...staticRoutes,
  ...menu,
]


const createRouter = () => new VueRouter({
  mode: 'history',
  routes
})
const router = createRouter()

router.beforeEach((to, from, next) => {
  next()
})
export default router;