<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: {
      type: String,
      required: true
      },
    activecolor:{
      type: String,
      default: '#000'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    activeStyle(){
      return this.isactive ? {color: this.activecolor, backgroudcolor: this.activecolor} : {}
    },
    isactive(){
      return this.$route.path.indexOf(this.link) !== -1
    }
  },
  methods: {
    itemclick() {
      if(this.$route.path != this.link){
        this.$router.replace(this.link)
      }else{
      }
    },
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>