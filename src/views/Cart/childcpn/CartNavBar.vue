<template>
  <div id="cart-navbar">
    <navbar>
      <template v-slot:left>
        <!-- <div class="back" @click="bthback">
          <img src="~assets/img/back.svg" alt />
        </div> -->
      </template>

      <template v-slot:center>
        <div class="title" @click="getnumber">
          <span>购物车 ( {{goods_number}} )</span>
        </div>
      </template>
      <template v-slot:right></template>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar";

export default {
  name: "CartNavBar",
  components: {
    navbar
  },
  data() {
    return {

    }
  },
  created() {},
  mounted(){

  },
  computed: {
    goods_number(){
      let total = 0;
      const cartList = this.$store.state.cartList
      if (cartList) {
        for (let shop in cartList) {
          for(let good in cartList[shop]){
            total += 1
          }
        }
      } else {
      }
      return total
    }
  },
  methods: {
    getnumber() {
      
    },
    bthback() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
#cart-navbar {
  background-color: var(--nav-bgcolor);
}

#cart-navbar .back img {
  height: 44px;
  width: 44px;
  transform: scale(0.5);
}

#cart-navbar .back img .icon {
  fill: aliceblue;
}

#cart-navbar .title {
  color: aliceblue;
}
</style>