<template>
  <div class="tab-control baseflexbox">
    <div v-for="(item,index) in titles" :key="index" :class="{activeitem: index == currentIndex}" @click="changeindex(index)" class="tab-item">
      <span >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeindex(index){
      this.currentIndex = index;
      this.$emit('typechange',this.currentIndex)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    margin-top: 10px;
    justify-content: space-around;
    line-height: 40px;
    font-size: 16px;
    position: relative;
    /* top: 44px; */
    background-color: #fff;
    background-size: cover;
    z-index: 9
  }
  .tab-item {
    padding-bottom: 5px;
  }

  .tab-item span{
    padding: 0 6px 5px 6px;
  }
  .activeitem {
    color: rgb(248, 72, 210);

  }

  .activeitem span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>