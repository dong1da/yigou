// trade
import {reqAddressInfo, reqOrderInfo} from '@/api'
// 存储数据
const state = {
  address: [],
  orderInfo: {}
}
// 修改数据
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
// 代码逻辑异步
const actions = {
  // 获取用户地址信息
  async getUserAddress ({commit}){
    let res = await reqAddressInfo()
    if(res.code == 200) {
      commit('GETUSERADDRESS', res.data)
    }
  },
  // 获取商品清单列表
  async getOrderInfo({commit}) {
    let res = await reqOrderInfo()
    if(res.code == 200) {
      commit('GETORDERINFO', res.data)
    }
  }
}
// 计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}