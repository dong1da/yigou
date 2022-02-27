import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数: 全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 引入路由
import router from '@/router'
// 引入store
import store from '@/store'
// 关闭生产提示
Vue.config.productionTip = false
// 引入mockServe.js --- mock模拟数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// element-ui按需引入
import 'element-ui/lib/theme-chalk/index.css';
import {Button, MessageBox} from 'element-ui'
Vue.component(Button.name, Button)
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入vue-lazyload
import dlrb from '@/assets/1.jpg'
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  loading: dlrb,  //懒加载默认图片
});

// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单验证插件
import validate from './plugins/validate'

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  router,
  store
}).$mount('#app')
