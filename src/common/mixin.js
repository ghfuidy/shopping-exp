//特殊方法
import { debounce } from "./utils";

//组件
import BackTop from "components/content/backtop/BackTop";

//常量
import { BACK_POSITION } from "./const"


/**
 * 图片加载的防抖监听
 */
export const itemimgloadMixin = {
  data(){
    return {
      scrollrefresh: null
    }
  },
  mounted(){
    this.scrollrefresh = debounce(this.$refs.Bscroll.Domrefresh, 50);
    this.$bus.$on("imageloadfn", this.scrollrefresh);
  },
  methods: {

  }
}

/**
 * 是否显示backtop组件和backtop组件的点击方法
 */
export const backTopMixin = {
  data() {
    return {
      backtopisshow: false,
    }
  },
  methods: {
    backtotop() {
      this.$refs.Bscroll.BacktoTop();
    },
    listnenShowbackTop(pos){
      this.backtopisshow = -pos > BACK_POSITION
    }
  },
  components: {
    BackTop
  }
}