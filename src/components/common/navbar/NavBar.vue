<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
}

.left {
  line-height: 44px;
  width: 60px;
  height: inherit;
}

.right {
  width: 60px;
  height: inherit;
}

.center {
  flex: 1;
  height: inherit;
}
</style>