import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './request/axios'
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(BaiduMap, {
  ak: 'vuOlo1POxDul5EnAHoZeutjEHBbxNmCy'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


export default app