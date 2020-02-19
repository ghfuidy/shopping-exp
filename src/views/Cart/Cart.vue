<template>
  <div>
    <cart-nav-bar></cart-nav-bar>
    <b-scroll class="scroll-content" ref="cartBscroll" v-if="this.$store.state.cartList">
      <cart-list v-for="(sitem, skey) in this.$store.state.cartList" :key="skey" :shoptitle="skey" :fullshop="sitem">
        <cart-list-item
          v-for="(gitem, gkey) in sitem"
          :goodinfos="gitem"
          :key="gkey"
          :shopname="skey"
        ></cart-list-item>
      </cart-list>
    </b-scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartNavBar from "./childcpn/CartNavBar";
import CartList from "./childcpn/CartList";
import CartListItem from "./childcpn/CartListItem";
import BScroll from "components/common/Bscroll/Bscroll";
import CartBottomBar from './childcpn/CartBottomBar'

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    CartListItem,
    BScroll,
    CartBottomBar
  },
  computed: {
    // gooddata(){
    //   return
    // }
  }
};
</script>

<style scoped>
.scroll-content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  background-color: rgb(245, 245, 245);
}
</style>