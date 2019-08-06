import Vue from 'vue'
import VueRouter from 'vue-router'
import dynamicRouter from './menu'

import staticRoutes from './static-routes'
Vue.use(VueRouter)

const routes = [
  ...staticRoutes,
  ...dynamicRouter,
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