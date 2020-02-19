<template>
  <div class="feature-box baseflexbox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FeatureBox'
}
</script>

<style scoped>
  .feature-box {
   width: 100%;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-evenly
  }
</style>