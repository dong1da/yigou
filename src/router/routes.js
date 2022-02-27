// 路由配置信息
// 引入一级路由组件
const Home = () => import('@/pages/Home')
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default [
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: {show: true},
    // 二级路由
    children: [
      {
        path: 'myorder',
        component: myOrder,
      },
      {
        path: 'groupOrder',
        component: groupOrder
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: {show: true},
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: {show: true},
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade') {
        next()
      }else{
        next(false)
      }
    }
  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: {show: true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 必须从购物车页面才能跳转到交易页面
      if(from.path == '/shopcart') {
        next()
      }else{
        next(false)
      }
    }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: {show: true}
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {show: true}
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {show: true},
  },
  {
    path: '/home',
    component: Home,
    // 路由元信息
    meta: {show: true}
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: {show: true}
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  // 重定向
  {
    path: '*',
    redirect: '/home'
  }
]