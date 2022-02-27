import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from "@/api";
import {getToken, setToken, removeToken} from '@/utils/token';
//登录与注册的模块
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    // 本地存储数据清空
    removeToken()
  }
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户注册
  async userRegister({commit}, user) {
    let res = await reqUserRegister(user)
    console.log(res)
    if(res.code == 200) {
      return '注册成功'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 用户登录【token】
  async userLogin( {commit}, data) {
    let res = await reqUserLogin(data)
    console.log(res)
    // 服务器有唯一的token
    if(res.code == 200) {
      commit('USERLOGIN', res.data.token)
      // 持久化存储token
      // localStorage.setItem('TOKEN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    } else {
      Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    let res = await reqUserInfo()
    if(res.code == 200) {
      commit('GETUSERINFO', res.data)
      return 'ok'
    } else {
      // Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}) {
    let res = await reqLogout()
    if(res.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};

// 登录 13700000000    111111