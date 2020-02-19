<template>
  <div class="feature">
    <feature-box>
      <div v-for="(item, index) in featuredata.slice(0,10)" :key="index">
        <feature-item :itemwidth=fullwidth>
          <a :href="item.link">
            <img v-lazy="item.image" alt="" @load="imageload">
          </a>
          <div>{{item.title}}</div>
        </feature-item>
      </div>
    </feature-box>
  </div>
</template>

<script>
import FeatureBox from "components/common/featurebox/FeatureBox";
import FeatureItem from "components/common/featurebox/FeatureItem";

export default {
  name: "FeatureView",
  components: {
    FeatureBox,
    FeatureItem
  },
  props: {
    featuredata: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      fullwidth: null
    }
  },
  created(){
    this.fullwidth = window.innerWidth/5;
  },
  methods: {
    imageload(){
      this.$emit('imageload')
    }
  }
};
</script>

<style scoped>
.feature {
  font-size: 14px;
}
</style>