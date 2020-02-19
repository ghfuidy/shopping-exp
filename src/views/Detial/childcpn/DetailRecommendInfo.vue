<template>
  <div>
    <div class="recommend-header">猜你喜欢</div>
    <good-list :goods="recommendInfo"></good-list>
  </div>
</template>

<script>
import { getRecommend } from "network/detail.js";
import GoodList from "components/content/goodlist/GoodList";

export default {
  name: "DetailRecommendInfo",
  components: {
    GoodList
  },
  props: {
    good_iid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      recommendInfo: []
    };
  },
  created() {
    getRecommend(this.good_iid)
      .then(result => {
        this.recommendInfo = result.data.data.list;
      })
      .catch(err => {});
  }
};
</script>

<style scoped>
.recommend-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  padding-left: 15px;
}
</style>