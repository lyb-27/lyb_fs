import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { Message, Modal } from 'iview';
import './theme-iview/index.less';
import './styles/index.less';

import * as filters from './filters';
// import './utils/flexble';
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

// 注册全局 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
