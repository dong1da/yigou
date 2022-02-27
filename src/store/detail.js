// detail详情模块
import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
// 存储数据
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
};
// 修改数据
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
};
// 业务逻辑，处理异步
const actions = {
  // 获取产品信息
  async getGoodInfo({commit}, skuId) {
    let res = await reqGoodsInfo(skuId);
    console.log(res);
    if(res.code == 200) {
      commit('GETGOODINFO', res.data)
    }
  },
  // 将产品加入到购物车
  async addOrUpadateShopCart({commit}, {skuId, skuNum}) {
    let res = await reqAddOrUpdateShopCart(skuId, skuNum);
    if(res.code == 200) {
      return '添加成功'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  }
};
// 计算属性
const getters = {
  // 路径导航数据简化
  categoryView(state) {
    // state.goodInfo 初始状态时空对象，空对象的categoryView属性值是undefined,所以会报错
    // categoryView属性值至少是一个空对象，假的就不会报错
    return state.goodInfo.categoryView || {};
  },
  // 产品信息简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 售卖属性数据简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
