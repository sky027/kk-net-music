import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/style/index.less';

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 请求
import request from '@/api/request';
Vue.prototype.$request = request;
// 路径
import urls from '@/api/urls';
Vue.prototype.$url = urls;


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
