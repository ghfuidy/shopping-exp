<template>
  <div class="recommend baseflexbox">
    <div v-for="(item, index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    box-shadow: 0 6px 0px rgb(226, 133, 187);
    margin: 10px 0 0px 0;
    padding-bottom: 10px;
  }
  
  .recommend img {
    width: 80%;
    margin-bottom: 5px;
  }

</style>