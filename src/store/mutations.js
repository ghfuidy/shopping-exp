import {
  ADD_COUNTER,
  ADD_TO_CART,
  ADD_TO_CARTSHOP
} from './mutations-types'

import Vue from 'vue'

export default {
    [ADD_COUNTER](state, payload) {
      // Vue.set(state.cartList[payload.shopname][payload.iid].count, payload.count)
    state.cartList[payload.shopname][payload.iid].count = payload.count
    },

    [ADD_TO_CART](state, payload){        
      if(payload.creatshop){
        Vue.set(state.cartList, payload.shopname, {})
      }    

      Vue.set(state.cartList[payload.shopname], payload.product.iid, {})

      payload.product.ischecked = true
      for (let key in payload.product){
        Vue.set(state.cartList[payload.shopname][payload.product.iid], key, payload.product[key])
      }
    },
    
    /**
     * 当复选框按钮状态改变时，实时返回chenge事件。
     * @param {object} state the vue store virability
     * @param {object} payload 
     */
    changechecked(state, payload){
      state.cartList[payload.shopname][payload.iid].ischecked = payload.status
    },
}

