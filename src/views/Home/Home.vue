<template>
  <div id="home">
    <navbar class="navcls">
      <template v-slot:center>
        <div class="homecenter">购物街</div>
      </template>
    </navbar>

    <tab-control
      :titles="['流行','新款','精选']"
      @typechange="gettype(arguments)"
      ref="tabcontrol2"
      v-show="tabisfixed"
      class="tabfixedtop"
    ></tab-control>
    <bscroll
      class="scroll-content"
      ref="Bscroll"
      :probeType="3"
      @scroll_pos="scroll_pos"
      :pullUpLoad="true"
      @pullingUP="pullingUP"
      @scrollloaded="change_scroll_status"
    >
      <div>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommend="recommends"></recommend-view>
        <feature-view :featuredata="features" @imageload="renewtopheight"></feature-view>
        <tab-control :titles="['流行','新款','精选']" @typechange="gettype(arguments)" ref="tabcontrol"></tab-control>
        <good-list :goods="goods[currenttype].list"></good-list>
        <!-- @startrefresh="scrollrefresh" -->
      </div>
    </bscroll>

    <back-top @click.native="backtotop" v-show="backtopisshow"></back-top>
  </div>
</template>

<script>
//组件
import navbar from "components/common/navbar/NavBar";
import HomeSwiper from "./childcomponents/HomeSwiper";
import RecommendView from "./childcomponents/RecommondView";
import FeatureView from "./childcomponents/FeatureView";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goodlist/GoodList";
import Bscroll from "components/common/Bscroll/Bscroll";

//方法
import { getHomeMultidata, getHomeGoods, getfeturedata } from "network/home.js";
import { debounce } from "common/utils.js";
import { itemimgloadMixin, backTopMixin } from "common/mixin.js";

//数据或常量
// import { home_media_image, mwpCb } from "assets/data/feature_l";

export default {
  name: "Home",
  components: {
    navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Bscroll
  },
  mixins: [itemimgloadMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      features: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenttype: "pop",
      tabisfixed: false,
      scrollloadstatus: false,
      taboffsettop: null,
      typescroll_h: {
        pop: 0,
        new: 0,
        sell: 0
      },
      leavepos: 0,
      realtimepos: 0,
    };
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    });

    getfeturedata().then(res => {
      this.features = res.data.data[132826].list;
    });

    this.getHomeGoodsdata("pop");
    this.getHomeGoodsdata("new");
    this.getHomeGoodsdata("sell");
  },
  mounted() {
    // const scrollintlid = setInterval(() => {
    //   if (this.scrollloadstatus) {
    //     console.log("加载完成");
    //   } else {
    //     console.log("loading");
    //   }
    // }, 500);
  },
  activated() {
    this.scrollrefresh();
    this.$bus.$on("imageloadfn", this.scrollrefresh);
    this.$refs.Bscroll.ScrollToPos(0, this.leavepos, 10);
  },
  deactivated() {
    this.$bus.$off("imageloadfn", this.scrollrefresh);
    this.leavepos = this.realtimepos
  },
  methods: {
    /**
     * 获取数据
     */
    getHomeGoodsdata(type) {
      let page = this.goods[type].page + 1;
      if (page == 1) {
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
        });
      } else {
        getHomeGoods(type, 2).then(res => {
          this.goods[type].list.push(...res.data.list);
        });
      }

      this.goods[type].page += 1;
    },
    /**
     * 查看当前子组件选项
     */
    gettype(args) {
      const currentindex = args[0];
      switch (currentindex) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
      this.$refs.tabcontrol.currentIndex = currentindex;
      this.$refs.tabcontrol2.currentIndex = currentindex;

      if (this.tabisfixed) {
        this.$refs.Bscroll.ScrollToPos(
          0,
          -this.typescroll_h[this.currenttype],
          30
        );
      }
    },

    //回到顶部
    //判断位置，显示回到顶部按钮
    scroll_pos(curr_pos) {
      this.realtimepos = curr_pos
      if (-curr_pos >= this.taboffsettop) {
        this.tabisfixed = true;
        this.typescroll_h[this.currenttype] = -curr_pos;
      } else {
        this.tabisfixed = false;
      }
      this.listnenShowbackTop(curr_pos);
    },
    //上拉事件
    pullingUP() {
      console.log("检测到上拉");
      this.getHomeGoodsdata(this.currenttype);
      this.$refs.Bscroll.finishPullUp();
    },
    //滚动区域初始加载状态完成
    change_scroll_status() {
      this.scrollloadstatus = true;
    },
    //监听图片加载更新tabcontrol到顶端的距离
    gettabtop() {
      this.taboffsettop = this.$refs.tabcontrol.$el.offsetTop;
      for (let x of Object.keys(this.typescroll_h)) {
        this.typescroll_h[x] = this.$refs.tabcontrol.$el.offsetTop;
      }
    },

    renewtopheight() {
      debounce(this.gettabtop, 100)();
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* position: relative; */
}

.homecenter {
  color: white;
}

.navcls {
  background-color: var(--nav-bgcolor);
  z-index: 9;
}

.scroll-content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabfixedtop {
  margin: unset;
  z-index: 8;
}
</style>