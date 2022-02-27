<template>
  <div id="app">
    <h1 v-upper="msg"></h1>
    <Header/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  data() {
    return {
      msg: 'abc'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    // 获取商品分类的三级列表数据，app根组件下只会发送一次请求，不会多次发送请求
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
