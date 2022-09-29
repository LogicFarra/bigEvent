import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

// 重写路由push和replace
//#region 
// 重写push和replace
// 先把VueRouter原型中的push方法保持一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push | replace
// location:告诉原来的push方法往哪里跳转，传递什么参数
// resolve:成功的回调
// reject:失败的回调
VueRouter.prototype.push = function(location,resolve,reject) {
  if(resolve && reject) {
    originPush.call(this,location,resolve,reject)
  }else { // 不管你点多少次，每次就覆盖之前的，相当于传了一次一模一样的路径
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
  if(resolve && reject) {
    originReplace.call(this,location,resolve,reject)
  }else {
    originReplace.call(this,location,()=>{},()=>{})
  }
}
//#endregion

const router =  new VueRouter({
  routes:[
    {
      path:'/',
      component:()=>import('@/views/layout'),
      redirect:'/home',
      children:[
        {
          path:'home',
          component:()=>import('@/views/home')
        },
       {
         path:'user-info',
         component:()=>import('@/views/personalCenter/UserInfo.vue')
       },
       {
         path:'user-avatar',
         component:()=>import('@/views/personalCenter/UserAvatar.vue')
       },
       {
         path:'user-pwd',
         component:()=>import('@/views/personalCenter/UserPassword.vue')
       },
       {
         path:'art-cate',
         component:()=>import('@/views/artcle/artCate.vue')
       },
       {
        path:'art-list',
        component:()=>import('@/views/artcle/artList.vue')
      }
      ]
    },
    {
      path:'/reg',
      component:()=>import('@/views/register')
    },
    {
      path:'/login',
      component:()=>import('@/views/login')
    }
  ]
})

let whiteList = ['/reg','/login']  //未登录可以访问的路由

// 全局路由前置守卫
router.beforeEach((to,from,next)=>{
   let token = store.state.token
   if(token){
    if(!store.state.userInfo.username){
      store.dispatch('getUserInfo')
    }
    next()
   }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      next('/login')
    }
   }
})

export default router
