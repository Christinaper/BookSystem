import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts';

import './assets/css/reset.sass'
import mandMobile from 'mand-mobile/lib/mand-mobile.esm'
import 'mand-mobile/lib/mand-mobile.css'
import 'mand-mobile/components/_style/global.styl'
import api from './api'
import plugins from './plugins'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(mandMobile)
Vue.prototype.$echarts = echarts;

Vue.use(plugins)
Vue.use(api)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')