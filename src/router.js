import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/login',
      component: resolve => require(['./components/login.vue'], resolve) 
    },
    {
      path:'/',
      redirect:'/dashboard'
    },
     {
       path:'/',
       component: resolve => require(['./components/common/Home.vue'], resolve),
       children:[
         {
           path:'/dashboard',
           component: resolve => require(['./components/page/dashboard.vue'], resolve),
           meta:{title:'处理中心'}
         },
         {
          path:'/addUser',
          component: resolve => require(['./components/page/addUser.vue'], resolve),
          meta:{title:'添加中心'}
         },
         {
           path:'/updateUser',
           component:resolve => require(['./components/page/updateUser.vue'],resolve),
           meta:{title:'我的工作台'}
         },
         {
           path:'/our',
           component:resolve => require(['./components/page/our.vue'],resolve),
           meta:{title:'关于我们'}
         }
       ]
     }
  ]
})
