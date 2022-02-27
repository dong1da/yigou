// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'
// 引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)


// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router =  new VueRouter({
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    return { y: 0 };
  },
})

// 全局前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next) => {
  // to: 可以获取到你要跳转到那个路由
  // from：可以获取到你从哪个路由跳转而来
  // next： 放行
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if(token) {  // 登录去的不是login或者注册页面
    // 用户已经登录无法进入login页面或者注册
    if(to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      if(name) {
        next()
      } else {
        // 没有用户信息，派发actions让仓库获取
        try {
          await store.dispatch('getUserInfo');
          next()
        } catch (error) {
          // 服务器的token失效重新登录, 先清除所有用户信息和token，在重新登录
          await store.dispatch('userLogout')
          next('/login')
        }     
      }
    }
  } else {
    // 未登录，不能去交易相关、不能去支付相关，不能去个人中心
    let toPath = to.path
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') !=-1) {
      // 把未登录的时候去登录路由，并携带要跳转路由的query参数
      next('/login?redirect='+toPath)
    }else{
      //去的不是上面这些路由（home|search|shopCart）---放行
      next()
    }
  }
})

// 

export default router