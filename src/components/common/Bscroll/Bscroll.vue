<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
// import BScroll from "better-scroll"

BScroll.use(Pullup);

export default {
  name: "Bscroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.init();
    this.loadfn();
  },
  beforeDestroy() {
    this.scroll.destroy();
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: this.probeType, // listening scroll hook
        pullUpLoad: this.pullUpLoad
      });

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", this.poscallback);
      }

      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", this.pullingHandle);
      }
    },

    Domrefresh() {
      console.log('------');
      this.scroll && this.scroll.refresh();
    },
    BacktoTop() {
      this.scroll.scrollTo(0, 0, 500);
    },

    //超过设定位置后显示backtop按钮
    poscallback(pos) {
      this.$emit('scroll_pos',pos.y)
      // if (pos.y < -800) {
      //   this.$emit("showbacktop", true);
      // } else {
      //   this.$emit("showbacktop", false);
      // }
    },

    pullingHandle() {
      this.$emit("pullingUP");
    },

    finishPullUp() {
      this.scroll.finishPullUp();
    },

    loadfn() {
      this.$emit("scrollloaded");
    },

    ScrollToPos(x, y, time){
      this.scroll.scrollTo(x, y, time)
    },

    ScrollToElement(tgDom, AmTime, offsetX=false, offsetY=false){
      this.scroll.scrollToElement(tgDom, AmTime, offsetX, offsetY)
    }
  }
};
</script>

<style scoped>
</style>