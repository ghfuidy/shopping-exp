<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(blockimage, blockindex) in detailInfo.detailImage" :key="blockindex">
      <h2 class="info-key">{{blockimage.key}}</h2>
      <div class="info-list">
        <img v-for="(item, index) in blockimage.list" v-lazy="item" alt :key="index" @load="goodinfoload"/>
      </div>
    </div>
  </div>
</template>

<script>
//特殊方法
import { debounce } from "common/utils.js";

export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  },
  data(){
    return {
      imageLength: 0
    }
  },
  methods: {
    goodinfoload(){
      this.$emit('goodinfoload')
    }
  },
  watch:{
    detailInfo(){
      for(let item of this.detailInfo.detailImage){
        this.imageLength += item.list.length
      }
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  width: 100%;
  margin: 10px 0 10px 0;
  color: #333;
  /* font-size: 15px; */
  line-height: 40px;
  text-align: center
}

.info-list img {
  width: 100%;
}
</style>
