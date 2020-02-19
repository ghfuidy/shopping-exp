<template>
  <div class="feature-item" :style="adjsustw">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FeatureItem',
  props: {
    itemwidth:{
      type: Number
    }
  },
  computed: {
    adjsustw(){
      return {
        width: this.itemwidth +'px',
      }
    }
  }
}
</script>

<style scoped>
  .feature-item {
    width: 18%;
    padding-top: 5px;
  }
  .feature-item img {
    width: 80%;
    margin-bottom: 5px;
  }
</style>