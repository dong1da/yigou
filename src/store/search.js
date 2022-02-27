// search模块
import { reqGetSearchInfo } from "@/api"
// state：存储数据
const state = {
  searchList: {}
}
// mutations：修改数据
const mutations ={
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// actions：业务逻辑，处理异步
const actions = {
  async getSearchList({commit}, params={}) {
    let res = await reqGetSearchInfo(params);
    if(res.code == 200) {
      commit('GETSEARCHLIST', res.data)
    }
  }
}
// 计算属性: 简化仓库中的数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}