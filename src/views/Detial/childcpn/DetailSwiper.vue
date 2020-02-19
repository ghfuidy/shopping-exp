<template>
  <swiper ref="swiper" v-if="topImage.length" class="detail-swiper">
    <swiper-item v-for="(item, index) in topImage" :key="index">
      <a>
        <img :src="item" alt @load="imageload"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/scrollimg/index";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
    
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      swiperstatus: {
        type: Boolean,
        default: false
      }
    }
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    },
    imageload(){
      if (!this.swiperstatus) {
        this.$emit('imageload')
        this.swiperstatus = true
      }
    }
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>