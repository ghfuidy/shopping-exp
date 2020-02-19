<template>
  <div class="bottom-bar baseflexbox">
    <div class="checkall baseflexbox">
      <cus-checkbox class="check-button" :ischecked="checkedstatus" @change="fullycheck"></cus-checkbox>
      <span>全选</span>
    </div>
    <div class="total-price">合计: {{totalPrice}}</div>
    <div class="go-calculate" @click="Settlement">去计算: ({{checkedlength}})</div>
  </div>
</template>

<script>
import CusCheckbox from "components/common/checkbox/checkbox";

export default {
  name: "CartBottomBar",
  components: {
    CusCheckbox
  },
  data(){
    return {
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      const cartList = this.$store.state.cartList;
      if (cartList) {
        for (let shop in cartList) {
          for (let good in cartList[shop]) {
            if (cartList[shop][good].ischecked) {
              total +=
                cartList[shop][good].count *
                parseFloat(cartList[shop][good].price);
            }
          }
        }
      }
      return "￥" + total.toFixed(2);
    },
    checkedlength: {
      get: function(){
      let clength = this.checkjudge('L')
      return clength;
      },
      set: function(){

      }

    },
    checkedstatus(){
      let status = this.checkjudge('S')
      return status
    }
  },
  methods: {
    fullycheck(status){
      const cartList = this.$store.state.cartList
      for(let shop in cartList){
        for(let good in cartList[shop]){
          this.$store.commit('changechecked',{
            shopname: shop,
            iid: good,
            status: status
          })
        }
      }
    },
    checkjudge(target){
      let clength = 0;
      let allcheck = true;
      const cartList = this.$store.state.cartList;
      if (cartList) {
        for (let shop in cartList) {
          for (let good in cartList[shop])
            if (cartList[shop][good].ischecked) {
              clength += 1;
            }else{
              allcheck = false
            }
        }
      }

      if (target == 'L') {
        return clength
      }else if(target == 'S'){
        return allcheck
      }
    },
    Settlement(){
      if (this.checkedlength == 0) {
        this.$toast.show('未选择商品')
      }else{
        this.$toast.show('结算功能未完成')
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  width: 100%;
  background-color: rgb(218, 192, 207);
  position: absolute;
  bottom: 49px;
  line-height: 40px;
  font-size: 14px;
}

.checkall {
  width: 20%;
}
.check-button {
  height: 20px;
  width: 20px;
  transform: translateY(13px) scale(0.9);
}
.total-price {
  width: 50%;
  height: 40px;
  text-align: left;
  text-indent: 15%;
}
.go-calculate {
  width: 30%;
  text-align: center;
  background-color: rgb(230, 42, 42);
  color: rgb(245, 236, 224);
}
</style>