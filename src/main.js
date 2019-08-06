import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  Pagination,
  Checklkrtrf5tbox,
  DatePicker,
  Form,
  FormItem,
  Input,
  Col,
  CheckboxGroup,
  Tree,
  Select,
  Option,
  Tooltip,
  Upload,
  MessageBox,
  TimeSelect,
  TimePicker,
  InputNumber,
  Radio,
  RadioGroup,
  Dialog,
  Message} from 'element-ui'
import dynamicRouter from './router/menu.js'
import Cookie from 'js-cookie'
import './styles/index.less';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Pagination)
// Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
Vue.use(CheckboxGroup)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$Message = Message;
import * as filters from './filters';
// console.log(store)
// import './utils/flexble';

// 注册全局 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (Cookie.get('token')) {
      if (to.path === '/') {
          next()
      } else {
          if(store.state.common.menuItem.length==0){
              let menu = localStorage.getItem('menuList')
              let menuList = JSON.parse(menu)
              let arr = []
              dynamicRouter.forEach(i=>{
                  menuList.forEach(j=>{
                      if(i.meta.roles[0]==j.keyCode){
                          arr.push({
                              path:i.path,
                              name:i.name,
                              title:j.zhCn,
                              icon: i.icon,
                              component:i.component,
                              parentId:j.parentId,
                              id: j.id
                          })
                      }
                      i.children.forEach(k=>{
                          if(k.meta.roles[0]==j.keyCode){
                            arr.push({
                                path:k.path,
                                name:k.name,
                                title:j.zhCn,
                                component:k.component,
                                parentId:j.parentId,
                                id: j.id
                            })
                          }
                      })
                  })
              })
              let arr1 = arr.filter(i=>i)
              console.log(filters)
              arr1 = Object.values(filters.formattingJson(arr1))
              router.addRoutes(arr1)
              store.dispatch('common/setMenu',arr1)
              next({ ...to, replace: true })
          }else {
              next()
          }
      }
  } else {
    if(to.path=='/'){
      next()
    }else{
      
      location.href = window.location.href.split('#')[0]
      sessionStorage.setItem('redirectUrl',encodeURIComponent(location.href))
      next()
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
