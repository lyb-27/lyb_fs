// import store from '../store/index'
const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');

const firstMenuComponent = AppLayout
// let newArr = []
// let firstRouter = {
//   path: '/first_home',
//   name: '首页',
//   component: firstMenuComponent,
//   children: [
//     {
//       path: 'home',
//       name: '首页',
//       meta: {
//         title: '首页',
//         component: () => import('@/pages/home/home/')
//       }
//     }
//   ]
// }
// newArr.push(firstRouter)
// if (window.localStorage.getItem('backtoken')) {
//   let menuLK = window.localStorage.getItem('backnewMenuList')
//   if (menuLK && menuLK !== undefined) {
//     JSON.parse(menuLK).forEach((e, index) => {
//       if (index === 1) {
//         let newObj = {}
//         newObj['path'] = `/${e.url}`
//         newObj['name'] = e.name
//         newObj['component'] = firstMenuComponent
//         newObj['children'] = []
//         if (e.list) {
//           e.list.forEach(v => {
//             let tnewObj = {}
//             tnewObj['path'] = v.url
//             tnewObj['name'] = v.name
//             tnewObj['meta'] = {}
//             tnewObj['meta'].title = v.name
//             tnewObj['component'] = () => import(`@/pages/${v.url}/`)
//             newObj['children'].push(tnewObj)
//           })
//         }
//         newArr.push(newObj)
//       }
//     });
//   }
// }

// // export default newArr
// export default [
//   {
//     path: '/front_index',
//     name: '首页',
//     component: firstMenuComponent,

//   },
  // {
  //   path: '/variable_manage',
  //   name: '产品管理',
  //   component: firstMenuComponent,
  //   children: [
  //     {
  //       path: 'develop1',
  //       name: '产品管理',
  //       meta: {
  //         title: '产品管理',
  //       },
  //       component: () => import('@/pages/variable-manage-develop/')
  //     },
  //     {
  //       path: 'develop2',
  //       name: '第三方产品管理',
  //       meta: {
  //         title: '第三方产品管理',
  //       },
  //       component: () => import('@/pages/variable-manage-develop/')
  //     }
  //   ]
  // },
  // {
  //   path: '/souece_data',
  //   name: '源数据',
  //   component: firstMenuComponent,
  //   children: [
  //     {
  //       path: 'manage',
  //       name: '源数据管理',
  //       meta: {
  //         title: '源数据管理',
  //       },
  //       component: () => import('@/pages/source-data/')
  //     }
  //   ]
  // },
// ]


export default [ //动态路由
  {
    path: '/recruitment',
    name: '用工管理',
    title: '用工管理',
    icon: 'icon-Employment-management',
    meta: {  //添加meta标签，里面自定义了roles，用来设置权限
      roles: ['A1000']  //该路由仅admin和user权限访问
    },
    component: firstMenuComponent,
    children: [
      {
        path: 'confirmationEmployment',
        name: '用工确认',
        title: '用工确认',
        meta: {  //添加meta标签，里面自定义了roles，用来设置权限
          roles: ['A1100']  //该路由仅admin和user权限访问
        },
        component: () => import('@/pages/recruitment/confirmationEmployment/')
        // component: (resolve) => require(['../components/recruitment/confirmationEmployment'], resolve)
      },
      // {
      //   path: 'personnelPlacement',
      //   name: 'personnelPlacement',
      //   title: '人员安排',
      //   meta: {  //添加meta标签，里面自定义了roles，用来设置权限
      //     roles: ['A1200']  //该路由仅admin和user权限访问
      //   },
      //   component: (resolve) => require(['../components/recruitment/personnelPlacement'], resolve)
      // },
      // {
      //   path: 'personnelManagement',
      //   name: 'personnelManagement',
      //   title: '人员管理',
      //   meta: {  //添加meta标签，里面自定义了roles，用来设置权限
      //     roles: ['A1300']  //该路由仅admin和user权限访问
      //   },
      //   component: (resolve) => require(['../components/recruitment/personnelManagement'], resolve)
      // },
    ]
  },

];