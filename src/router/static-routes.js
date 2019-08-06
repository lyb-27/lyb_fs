// 静态路由 
const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');
const firstMenuComponent = AppLayout
const initMenu = [
  // {
  //   path: '/',
  //   name: 'hello',
  //   meta: {
  //     title: 'hello',
  //   },
  //   component: () => import('@/pages/hello-world/'),
  // },
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '欢迎登录',
    },
    component: () => import('@/pages/login/'),
  },
  {
    path:'/first_home',
    name:'首页',
    component:firstMenuComponent,
    children:[
      {
        path:'home',
        name:'首页',
        meta:{
          title:'首页',
          component: () => import('@/pages/home/')
        }
      }
    ]
  }
];

export default initMenu;
