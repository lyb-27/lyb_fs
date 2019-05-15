// 静态路由 
const initMenu = [
  {
    path: '/',
    name: 'hello',
    meta: {
      title: 'hello',
    },
    component: () => import('@/pages/hello-world/'),
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '欢迎登录',
    },
    component: () => import('@/pages/login-front/'),
  },
];

export default initMenu;
