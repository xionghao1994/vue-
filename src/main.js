import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

// 请求基地址
axios.defaults.baseURL ="http://localhost:3000/";
Vue.prototype.$http =axios;

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('ms_username');
//   if(role){
//     next();
//   }else{
//     if(to.path =='/login'){
//       next();
//     }else{
//       next('/login');
//     }
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
