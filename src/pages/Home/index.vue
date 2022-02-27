<template>
  <div>
    <!-- 三级联动组件已经注册为全局组件，不需要引入可以直接使用 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name: '',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // Floor组件重复调用两次，所以在home组件下向服务器发送数据请求
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
 
}
</script>

<style lang="less" scoped>

</style>