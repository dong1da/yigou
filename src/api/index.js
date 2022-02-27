// API统一管理
import requests from './request'
// mock模拟数据
import mockRequests from './mockAjax'
import trade from '@/store/trade';

// 获取三级联动数据  product/getBaseCategoryList   GET    没有任何参数
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

// 获取banner(Home首页轮播图数据)
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

// 获取搜索模块数据  地址:/api/list  请求方式:post  参数:需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = params => requests({url: '/list', method: 'post', data: params})

// 获取产品详情数据   URL: /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = skuId => requests({url: `/item/${skuId}`, method: 'get'})

// 添加到购物车/更新购物车  /api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

// 获取购物车列表数据  /api/cart/cartList  get
export const reqCartList = () => requests.get('/cart/cartList')

// 删除购物车中的某个商品  /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartById = skuId => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

// 切换商品选中状态   /api/cart/checkCart/{skuID}/{isChecked}  get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'});

// 用户注册   /api/user/passport/register   post  phone password code
export const reqUserRegister = (data) => requests({url: '/user/passport/register', data, method: 'post'})

// 用户登录   /api/user/passport/login  post   phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method: 'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】  /api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'});

// 退出登录  URL:/api/user/passport/logout  get
export const reqLogout = ()=> requests({url: '/user/passport/logout',method:'get'});

//获取用户地址信息  /api/user/userAddress/auth/findUserAddressList  method:get 
export const reqAddressInfo = () => requests({url: '/user/userAddress/auth/findUserAddressList', method:'get'});

//获取商品清单  /api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo,data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'});

//获取支付信息   /api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method: 'get'});

//获取支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method: 'get'});

//获取个人中心的数据   /api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'});

//