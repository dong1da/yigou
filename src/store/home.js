// home模块
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

// state：存储数据
const state = {
  categoryList: [],  //三级联动菜单的数据
  bannerList: [],  //轮播图数据
  floorList:[],  //floor组件的数据
}
// mutations：修改数据
const mutations ={
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
// actions：业务逻辑，处理异步
const actions = {
  // 通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async categoryList({commit}) {
    let result = await reqCategoryList()
    if(result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if(result.code == 200) {
      commit('GETBANNERLIST', result.data);
    }
  },
  // 获取楼层floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      //提交mutation
      commit("GETFLOORLIST", result.data);
    }
  },
}
// 计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}