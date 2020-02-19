<template>
  <div class="cartitem baseflexbox">
    <div class="item-sel">
      <cus-checkbox :ischecked="goodinfos.ischecked" @change="checked"></cus-checkbox>
    </div>
    <div class="item-img">
      <img v-lazy="goodinfos.image" alt="商品图片">
    </div>
    <div class="item-msg">
      <div class="item-title">{{goodinfos.title}}</div>
      <div class="item-desc">{{goodinfos.desc}}</div>
      <div class="item-num baseflexbox" >
        <div class="num-text">￥{{realprice}}</div>
        <div class="num-operate">
          <button @click="changecount('decrement')" :disabled="goodinfos.count<=1">-</button>
          <span @click="countinput">{{goodinfos.count}}</span>
          <button @click="changecount('increment')">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CusCheckbox from "components/common/checkbox/checkbox";

export default {
  name: 'CartListItem',
  data(){
    return {

    }
  },
  props: {
    goodinfos: {
      type: Object,
    },
    shopname: {
      type: String,
    },
  },
  components: {
    CusCheckbox
  },
  created(){
  },
  computed: {
    goodcount(){
      return this.goodinfos.count
    },
    realprice(){
      return parseFloat(this.goodinfos.price).toFixed(2)
    },
    totalcount(){
      return this.$store.state.cartList[this.shopname][this.gindex].count
    }
  },
  watch:{
    // goodinfos: {
    //   handler: function(newVal, oldVal){
    //     console.log("newVal");
    //   },
    //   deep: true,
    // },
  },
  methods: {
    countinput(){

    },
    checked(status){      
      this.$store.commit('changechecked',{
        shopname: this.shopname,
        iid: this.goodinfos.iid,
        status,
      })
    },
    changecount(ctype,inputcount=1){
      let count;
      if (ctype === 'decrement') {
        count = this.goodinfos.count - 1
      }else if(ctype === 'increment'){
        count = this.goodinfos.count + 1
      }else if(ctype === 'countinput'){
        count = inputcount
      }
        this.$store.commit('add_counter',{
          shopname: this.shopname,
          iid: this.goodinfos.iid,
          count,
        })
    }
  }
}
</script>

<style scoped>
  .cartitem{
    position: relative;
    width: 100%;
    padding: 5px 5px 5px 25px;
    border-top: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    /* border-bottom: 1px solid #ccc; */
  }
  .item-sel{
    position: relative;
    width: 30px;
    height: 30px;;
    padding-top: 40px;
    transform: scale(0.9)
  }
  .item-img {
    position: relative;
    width: 90px;
    height: 110px;
    padding: 5px;
    margin:0 5px 0 5px;
    border: 1px solid #ccc;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-msg{
    position: relative;
    width: 100%;
    height: inherit
  }

  .item-msg .item-title{
    width: 100%;
    height: 30px;
    line-height: 15px;
    text-align: left;
    font-size: 13px;
    overflow: hidden;
  }
  .item-msg .item-desc {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 12px;
    overflow: hidden;
  }

  .item-msg .item-num{
    position: relative;
    left: 0;
    top: 10px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 12px;
  }

  .num-text,
  .num-operate
  {
    flex-direction: row;
    width: 50%;
  }

  .num-operate span {
    display: inline-block;
    width: 50%;
    height: 20px;
    border: none;
    text-align: center;
  }

  .num-operate button{
    width: 20%;
    height: auto;
    /* border: none; */
    /* background-color: #fff; */
  }
</style>