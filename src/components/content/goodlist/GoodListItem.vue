<template>
  <div class="good-item" @click="itemclick">
    <img v-lazy="good.image" alt="" :key="good.tradeItemId" @load="imageload">
    <div class="good-info">
      <p>{{good.title?good.title:'暂无简介'}}</p>
      <span class="price">￥{{good.price}}</span>
      <span class="favorites"><img src="~assets/img/star.svg" alt="">{{good.itemLikes}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    good: {
      type: Object,
      default() {
        return {} 
      }
    }
  },
  computed: {
    xz_imageurl(){
      if (this.good.type == 'content') {
        // console.log(this.good.cover);
        return this.good.cover
      }else if(this.good.type == 'topic'){
        return this.good.contentCoverList[0]
      }else{
        return this.good.avatar
      }
    }
  },
  methods: {
    imageload(){
      this.$bus.$emit('imageloadfn')
    },
    itemclick(){
      this.$router.push('/detial/'+this.good.item_id)
    }
  }
}
</script>

<style scoped>
  .good-item {
    padding-bottom: 20px;
    position: relative;
    width: 48%;
  }
 
  .good-item img {
    width: 100%;
    border-radius: 5px;
  }

  .good-info {
    font-size: 12px;
    position: relative;
    margin-top: 6px;
    overflow: hidden;
    text-align: center;
  }

  .good-item p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .good-item .price,
  .good-item .favorites{
    margin: 0 5px 0 5px;

  }

  .good-item .price {
        color: rgb(243, 122, 122)
  }
  
  .good-item .favorites img{
    height: 14px;
    width: 14px;
    transform: translateY(2px);
    margin: 0px 2px 0 0;
  }
</style>