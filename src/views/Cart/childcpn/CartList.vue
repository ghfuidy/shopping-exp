<template>
  <div id="" class="baseflexbox cartshop">
    <div class="shop_id baseflexbox">
      <div class="chenckpos">
        <cus-checkbox :ischecked="isListChecked" @change="checkall"></cus-checkbox>
      </div>
      <div class="shop_title">{{shoptitle}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import CusCheckbox from "components/common/checkbox/checkbox";

export default { 
  name: "CartList",
  props:{
    shoptitle:{
      type: String,
    },
    fullshop: {
      type: Object
    }
  },
  components: {
    CusCheckbox
  },
  computed: {
    isListChecked(){
      let checked = true;
      for(let item in this.fullshop){
        if (!this.fullshop[item].ischecked) {
          checked = false
        }
      }
      return checked
    },
  },
  methods: {
    checkall(event){
      for(let item in this.fullshop){
        this.$store.commit('changechecked',{
        shopname: this.shoptitle,
        iid: item,
        status: event
      })
      }
    }
  }
};
</script>

<style scoped>
.cartshop{
  position: relative;
  border-radius: 5px;
  /* background-color: rgb(200, 199, 199); */
  border: 1px solid rgb(179, 178, 178);
  flex-direction: column;
  width: 95%;
  margin: 5px 2.5% 5px 2.5%;
  border-width: 0.5px;
  border-top: unset;
}

.shop_id {
    background: linear-gradient(0deg,rgb(242, 243, 239), rgb(240, 212, 223), rgb(241, 175, 213), rgb(248,131,206));
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  border-radius: 5px;
  
  /* background-color: rgb(202, 202, 202); */
  height: 30px;
  justify-content: space-evenly;

}

.chenckpos{
  position: relative;
  width: 20px;
  height: 20px;
  transform: translateY(10px) scale(0.9)
}
.shop_title {

  width: calc(95% - 30px);
  text-align: left;
  flex-direction: row;
  line-height: 30px;
  font-size: 12px;
  color: #272627;
}
</style>