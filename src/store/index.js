import Vue from 'vue'
import Vuex from 'vuex'

//导入组件
import mutations from "./mutations"
import actions from "./actions"
import state from "./state"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store