// shopcart模块
import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api'
// 存储数据
const state = {
  cartList: []
}
// 修改数据
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
// 业务逻辑，异步操作
const actions = {
  // 获取购物车列表数据
  async getCartList({commit}) {
    let res = await reqCartList();
    if(res.code == 200) {
      commit('GETCARTLIST', res.data)
    }
  },
  // 删除购物车某一项产品
  async deleteCartListBySkuId({commit}, skuId) {
    let res = await reqDeleteCartById(skuId);
    if(res.code == 200) {
      return '删除成功'
    }else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckById({commit}, {skuId, isChecked}) {
    let res = await reqUpdateCheckedById(skuId, isChecked)
    if(res.code == 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({dispatch, getters}) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的promise添加到数组
      promiseAll.push(promise)
    })
    // 全部删除成功返回成功，一个未删除成功就删除失败
    return Promise.all(promiseAll)
  },
  // 修改购物车全部产品的选中状态
  updateAllCartIsChecked({dispatch, state}, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll)
  },
}
// 计算属性
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}