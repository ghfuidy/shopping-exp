<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tab-bar {
  display: flex;
  background-color: rgb(224, 223, 223);
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0px -1px 2px rgba(236, 234, 234,0.9);
  height: 49px;
}


</style>