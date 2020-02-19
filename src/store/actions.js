import {
  ADD_COUNTER,
  ADD_TO_CART,
  ADD_TO_CARTSHOP
} from './mutations-types'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = payload.product
      let shopname = payload.shopname
      let cartlist = context.state.cartList
  
      if (cartlist[shopname]) {
        if(cartlist[shopname][product.iid]){
          if(product.count){
            resolve('商品已添加到购物车中')
          }else{
            product.count = cartlist[shopname][product.iid].count + 1
            resolve('商品已存在，数量+1')
          }
          context.commit(ADD_COUNTER, {
            shopname,
            iid: product.iid,
            count: product.count
          })
        }else{
          product.count = 1
          context.commit(ADD_TO_CART, {
            product: product,
            shopname: shopname,
            creatshop: false
          })
          resolve('商品添加成功')
        }
      } else {
        product.count = 1
        context.commit(ADD_TO_CART, {
          product: product,
          shopname: shopname,
          creatshop: true
        })
        resolve('商品添加成功')
      }
    })

  },

  changestatus(context, payload){
    context.commit()
  }  
}