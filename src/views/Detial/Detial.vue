<template>
  <div id="detail">
    <detail-nav-bar @titleclick="titleclick" ref="detailnavbar"></detail-nav-bar>
    <bscroll ref="Bscroll" :probeType="3" @scroll_pos="scroll_pos" class="scroll-content">
      <detail-swiper :topImage="topImage" @imageload="Domrefresh" ref="goodtarget"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @goodinfoload="Domrefresh"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="goodparams"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="goodcomment"></detail-comment-info>
      <detail-recommend-info :good_iid="iid" ref="goodrecommend"></detail-recommend-info>
    </bscroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backtotop" v-show="backtopisshow"></back-top>
  </div>
</template>

<script>
import Bscroll from "components/common/Bscroll/Bscroll";
import DetailNavBar from "./childcpn/DetailNavBar";
import DetailSwiper from "./childcpn/DetailSwiper";
import DetailBaseInfo from "./childcpn/DetailBaseInfo";
import DetailShopInfo from "./childcpn/DetailShopInfo";
import DetailGoodsInfo from "./childcpn/DetailGoodsInfo";
import DetailParamInfo from "./childcpn/DetailParamInfo";
import DetailCommentInfo from "./childcpn/DetailCommentInfo";
import DetailRecommendInfo from "./childcpn/DetailRecommendInfo";
import DetailBottomBar from "./childcpn/DetailBottomBar"

//获取数据
import { getDetail, Goods, Shop, GoodsParams } from "network/detail.js";

//特殊方法
import { itemimgloadMixin, backTopMixin } from "common/mixin.js";

export default {
  name: "Detail",
  components: {
    Bscroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar
  },
  mixins: [itemimgloadMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      themeTopYs: [],
      curr_pos_idx: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //根据iid请求数据
    getDetail(this.iid)
      .then(result => {
        //轮播图
        const fulldata = result.data.data.result;
        this.topImage = fulldata.topImages;

        //商品信息
        this.goods = new Goods(
          fulldata.itemInfo,
          fulldata.itemServices.columns,
          fulldata.shopInfo.services,
          fulldata.priceInfo
        );

        //店铺信息
        this.shop = new Shop(fulldata.shopInfo);

        //详细信息
        this.detailInfo = fulldata.detailInfo;

        //获取参数的信息
        this.paramInfo = new GoodsParams(
          fulldata.itemParams.info,
          fulldata.itemParams.rule
        );

        //获取评论信息
        if (fulldata.rateInfo.cRate !== 0) {
          this.commentInfo = fulldata.rateInfo;
        }
      })
      .catch(err => {});
  },
  mounted() {

  },
  updated(){

  },
  destroyed() {
    this.$bus.$off("imageloadfn", this.scrollrefresh);
  },
  methods: {
    /**
     * 调用scrollrefresh的BScroll刷新方法，并更新元素高度
     */
    Domrefresh() {
      this.scrollrefresh()
      this.get_themeTopYs()
    },
    
    /**
     * 获取分块区域到元素顶部的高度
     */
    get_themeTopYs(){
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.goodparams.$el.offsetTop)
        this.themeTopYs.push(this.$refs.goodcomment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.goodrecommend.$el.offsetTop)
    },

    /**
     * 点击title，判断应该滚动到的元素
     */
    titleclick(titleindex) {
      this.curr_pos_idx = titleindex
      switch (titleindex) {
        case 0:
          this.$refs.Bscroll.ScrollToElement(this.$refs.goodtarget.$el);
          break;
        case 1:
          this.$refs.Bscroll.ScrollToElement(this.$refs.goodparams.$el);
          break;
        case 2:
          this.$refs.Bscroll.ScrollToElement(this.$refs.goodcomment.$el);
          break;
        case 3:
          this.$refs.Bscroll.ScrollToElement(this.$refs.goodrecommend.$el);
          break;
        default:
          break;
      }
    },

    /**
     * 返回滚动位置，判断顶部index of title，是否显示backtop
     */
    scroll_pos(curr_pos){
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (this.curr_pos_idx != i && (-curr_pos >= this.themeTopYs[i])) {
          this.curr_pos_idx = i;
        }
      }
      this.$refs.detailnavbar.currnetIndex = this.curr_pos_idx;

      this.listnenShowbackTop(curr_pos)
    },

    /**
     * 添加到购物车
     */
    addToCart(){
      const product = {}
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.detailInfo.desc
      product.price = this.goods.newPrice
      product.iid = this.goods.real_iid
      // console.log(product);
      // this.$store.carList

      this.$store.dispatch('addCart', {
        product: product, 
        shopname:this.shop.name,
        }).then(res => {
          this.$toast.show(res)          
        })
    }
  }
};
</script>

<style>
#detail {
  height: 100vh;
  position: relative;
  background-color: #fff;
  z-index: 1
}

#detail .scroll-content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>